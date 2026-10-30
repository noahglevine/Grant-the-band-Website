#!/usr/bin/env python3
"""Builds the GRANT the band EPK PDF, wordmark logos and the organized press kit zip.
Run from the repo root: python3 scripts/make_press_kit.py
Needs: pip install reportlab qrcode pillow
Outputs: public/press/grant-the-band-epk.pdf, public/press/grant-the-band-press-kit.zip
"""
import os, urllib.request, shutil, zipfile, tempfile
FONTS=os.path.join(tempfile.gettempdir(),'gtb-fonts')+'/'
os.makedirs(FONTS,exist_ok=True)
SRC={'Montserrat-Light':'https://raw.githubusercontent.com/JulietaUla/Montserrat/master/fonts/ttf/Montserrat-Light.ttf',
'Montserrat-Regular':'https://raw.githubusercontent.com/JulietaUla/Montserrat/master/fonts/ttf/Montserrat-Regular.ttf',
'Montserrat-Medium':'https://raw.githubusercontent.com/JulietaUla/Montserrat/master/fonts/ttf/Montserrat-Medium.ttf',
'Montserrat-SemiBold':'https://raw.githubusercontent.com/JulietaUla/Montserrat/master/fonts/ttf/Montserrat-SemiBold.ttf',
'Montserrat-Bold':'https://raw.githubusercontent.com/JulietaUla/Montserrat/master/fonts/ttf/Montserrat-Bold.ttf',
'ReenieBeanie':'https://raw.githubusercontent.com/google/fonts/main/ofl/reeniebeanie/ReenieBeanie.ttf'}
for n,u in SRC.items():
    p=FONTS+n+'.ttf'
    if not os.path.exists(p): urllib.request.urlretrieve(u,p)
EPK_OUT='public/press/grant-the-band-epk.pdf'
# ---------------- EPK PDF ----------------
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from PIL import Image
import qrcode, io
F=FONTS; IMG='public/images/'
for n,f in [('L','Montserrat-Light'),('R','Montserrat-Regular'),('M','Montserrat-Medium'),('SB','Montserrat-SemiBold'),('B','Montserrat-Bold'),('HW','ReenieBeanie')]:
    pdfmetrics.registerFont(TTFont(n,F+f+'.ttf'))
W,H=612,792
NIGHT=(0x10/255,0x15/255,0x1C/255); CREAM=(0xF4/255,0xEB/255,0xDD/255); GOLD=(0xF6/255,0xCB/255,0x8A/255); AMBER=(0xE3/255,0xA3/255,0x5C/255); MUTED=(0.72,0.69,0.64)
M=40
def cover(c,path,x,y,w,h,focus=(0.5,0.5),grad=None):
    im=Image.open(path).convert('RGB'); iw,ih=im.size; r=w/h
    if iw/ih>r: nw=int(ih*r); l=int((iw-nw)*focus[0]); im=im.crop((l,0,l+nw,ih))
    else: nh=int(iw/r); t=int((ih-nh)*focus[1]); im=im.crop((0,t,iw,t+nh))
    s=min(1,(w*3)/im.width); im=im.resize((int(im.width*s),int(im.height*s)))
    if grad:
        t0,b0=grad; ov=Image.new('RGB',im.size,(0x10,0x15,0x1C)); m=Image.new('L',im.size)
        for yy in range(im.height):
            a=t0+(b0-t0)*yy/(im.height-1); m.paste(int(255*a),(0,yy,im.width,yy+1))
        im=Image.composite(ov,im,m)
    b=io.BytesIO(); im.save(b,'JPEG',quality=88); b.seek(0)
    c.drawImage(ImageReader(b),x,y,w,h)
def scrim(c,x,y,w,h,top_alpha=0,bot_alpha=0.85,steps=60):
    for i in range(steps):
        a=bot_alpha+(top_alpha-bot_alpha)*i/(steps-1)
        c.setFillColorRGB(*NIGHT); c.setFillAlpha(a); c.rect(x,y+h*i/steps,w,h/steps+0.5,stroke=0,fill=1)
    c.setFillAlpha(1)
def bg(c): c.setFillColorRGB(*NIGHT); c.rect(0,0,W,H,stroke=0,fill=1)
def label(c,x,y,t,col=GOLD,size=7.5,sp=1.6):
    c.setFillColorRGB(*col); c.setFont('M',size); c._code.append('%s Tc'%sp); c.drawString(x,y,t); c._code.append('0 Tc')
def title(c,x,y,t,size=20):
    c.setStrokeColorRGB(*AMBER); c.setLineWidth(1.5); c.line(x,y+size+8,x+32,y+size+8)
    c.setFillColorRGB(*CREAM); c.setFont('R',size); c._code.append('%s Tc'%(size*0.06)); c.drawString(x,y,t); c._code.append('0 Tc')
def para(c,x,y,text,w,font='R',size=9.5,lead=14.5,col=CREAM):
    c.setFillColorRGB(*col); c.setFont(font,size); words=text.split(); line=''
    for wd in words:
        t=(line+' '+wd).strip()
        if pdfmetrics.stringWidth(t,font,size)>w: c.drawString(x,y,line); y-=lead; line=wd
        else: line=t
    if line: c.drawString(x,y,line); y-=lead
    return y
def qr(c,url,x,y,s):
    q=qrcode.QRCode(border=1,box_size=10); q.add_data(url); q.make(fit=True)
    im=q.make_image(fill_color=(0x10,0x15,0x1C),back_color=(0xF4,0xEB,0xDD)).convert('RGB')
    b=io.BytesIO(); im.save(b,'PNG'); b.seek(0); c.drawImage(ImageReader(b),x,y,s,s)
def wordmark(c,x,y,size):
    c.setFillColorRGB(*CREAM); c.setFont('L',size); c._code.append('%s Tc'%(size*0.05)); c.drawString(x,y,'GRANT'); c._code.append('0 Tc')
    gw=pdfmetrics.stringWidth('GRANT','L',size)+size*0.05*4
    c.setFillColorRGB(*GOLD); c.setFont('HW',size*0.48); tw=pdfmetrics.stringWidth('the band','HW',size*0.48); c.drawString(x+gw-tw,y-size*0.36,'the band')
def footer(c,page):
    c.setStrokeColorRGB(0.22,0.24,0.28); c.setLineWidth(0.5); c.line(M,46,W-M,46)
    c.setFillColorRGB(*CREAM); c.setFont('SB',8.5); c.drawString(M,30,'contact@granttheband.com')
    c.setFillColorRGB(*MUTED); c.setFont('R',8.5); c.drawString(M+128,30,'granttheband.com/book    @grant_theband')
    c.drawRightString(W-M,30,'%d / 2'%page)
    c.drawImage(IMG+'gtb-monogram.png',W-M-46,25,16,16,mask='auto')

c=canvas.Canvas(EPK_OUT,pagesize=(W,H))
c.setTitle('GRANT the band EPK'); c.setAuthor('GRANT the band')
# PAGE 1
bg(c)
hh=330; cover(c,IMG+'hero-desktop-poster.jpg',0,H-hh,W,hh,focus=(0.5,0.5),grad=(0.1,0.93))
wordmark(c,M,H-hh+78,62)
label(c,M,H-hh+30,'INDIE ROCK WITH A HORN SECTION  ·  LONG ISLAND, NY')
y=H-hh-34
colL=M; colR=360; wL=290
title(c,colL,y-18,'THE BAND'); 
y2=para(c,colL,y-44,"GRANT the band is a six-piece indie rock band from Long Island with a horn section and a live show built to move a room. They play originals off their EP Meroke Lane alongside the covers people came for.",wL)
y2=para(c,colL,y2-6,"Two summers as the residency band at Cooper Bluff, plus The Stephen Talkhouse, 89 North, Piquet Lane Tennis & Swim Club, The Villager and Nag’s Head Ale House.",wL)
# at a glance
title(c,colR,y-18,'AT A GLANCE')
rows=[('FORMATS','Full band with horns (6-piece)'),('','Trio or duo, acoustic'),('SETS','2 to 3 hours'),('SOUND','We bring our own PA'),('BOOKING','Clubs, residencies, private events')]
yy=y-44
for k,v in rows:
    if k: label(c,colR,yy,k,size=7)
    c.setFillColorRGB(*CREAM); c.setFont('R',9.5); c.drawString(colR+70,yy,v); yy-=17
# played + press
y3=min(y2,yy)-34
title(c,colL,y3-18,'PLAYED')
venues=[('The Stephen Talkhouse','Amagansett'),('Cooper Bluff','Summer Residency, 2025 and 2026'),('89 North','Patchogue'),('Piquet Lane Tennis & Swim Club','Woodbury'),('The Villager','Farmingdale'),('Nag’s Head Ale House','Huntington')]
vy=y3-46
for v,s in venues:
    c.setFillColorRGB(*CREAM); c.setFont('R',9.5); c.drawString(colL,vy,v)
    if s: c.setFillColorRGB(*GOLD); c.setFont('R',7.5); c.drawString(colL+pdfmetrics.stringWidth(v,'R',9.5)+8,vy+0.5,s)
    vy-=17
title(c,colR,y3-18,'PRESS')
py=y3-48
for q,a in [('“Everyone is executing their instrument… top shelf.”','Phillip Torvik, producer, on “Man on a Train”'),('“High-energy live performances with emotionally charged songwriting.”','Rolling Hype, February 2025')]:
    c.setStrokeColorRGB(*AMBER); c.setLineWidth(1.2)
    top=py+10
    py2=para(c,colR+12,py,q,W-M-colR-12,font='L',size=11.5,lead=15)
    c.setFillColorRGB(*GOLD); c.setFont('R',7.5); c.drawString(colR+12,py2-2,a)
    c.line(colR,top,colR,py2-5); py=py2-26
footer(c,1); c.showPage()
# PAGE 2
bg(c)
ph=210; gap=6; w1=(W-gap)/2
cover(c,IMG+'89north-full-band.jpg',0,H-ph,w1,ph,focus=(0.5,0.6))
cover(c,IMG+'talkhouse-drums.jpg',w1+gap,H-ph,w1,ph,focus=(0.5,0.4))
y=H-ph-40
title(c,M,y-18,'LISTEN')
cs=128; cover(c,IMG+'meroke-lane-cover.jpg',M,y-44-cs,cs,cs)
tx=M+cs+18
label(c,tx,y-50,'MEROKE LANE  ·  EP  ·  OUT EVERYWHERE',size=7)
ty=y-70
for i,t in enumerate(['Meroke','Horizon','Peace of Mind','Waking Up','Man on a Train'],1):
    c.setFillColorRGB(*GOLD); c.setFont('R',8.5); c.drawString(tx,ty,str(i))
    c.setFillColorRGB(*CREAM); c.setFont('R',9.5); c.drawString(tx+14,ty,'“%s”'%t); ty-=16
qs=62; qx=W-M-qs; qr(c,'https://open.spotify.com/album/6sBrvYJHa66nYqVTg6bNa2',qx,y-44-qs,qs)
c.setFillColorRGB(*MUTED); c.setFont('R',7); c.drawCentredString(qx+qs/2,y-44-qs-11,'Spotify')
y=y-44-cs-40
title(c,M,y-18,'WATCH')
clips=[('“Man on a Train”','Live at The Stephen Talkhouse','https://www.youtube.com/watch?v=Fz9s33Rsvh8',IMG+'talkhouse-stage.jpg'),('“Around the Moon”','Live at 89 North','https://www.youtube.com/watch?v=a1R_eGE8rbk',IMG+'89north-noah-trombone.jpg'),('Full show','Live at Cooper Bluff','https://www.youtube.com/watch?v=cTb2dEve5B8',None)]
cw=(W-2*M-2*16)/3; cy=y-44
for i,(t,s,u,im) in enumerate(clips):
    x=M+i*(cw+16); th=cw*0.56
    if im: cover(c,im,x,cy-th,cw,th)
    else: cover(c,IMG+'cooper-golden-hour.jpg',x,cy-th,cw,th)
    qr(c,u,x+cw-34,cy-th+4,30)
    c.setFillColorRGB(*CREAM); c.setFont('R',9.5); c.drawString(x,cy-th-15,t)
    c.setFillColorRGB(*GOLD); c.setFont('R',7.5); c.drawString(x,cy-th-27,s)
y=cy-cw*0.56-60
title(c,M,y-18,'TECH')
items=['6 players · 19 inputs','2 mono DIs on lead (acoustic + trigger pad)','Vocal FX on lead mic (XLR in and out)','3 vocal mics','We bring our own PA','Stage plot: granttheband.com/book']
ty=y-44
for i,t in enumerate(items):
    x=M if i<3 else M+215; yy=ty-(i%3)*16
    c.setFillColorRGB(*CREAM); c.setFont('R',9.5); c.drawString(x,yy,t)
# book CTA
qs2=52; bx=W-M-qs2; by=y-44-qs2+16
qr(c,'https://granttheband.com/book',bx,by,qs2)
c.setFillColorRGB(*GOLD); c.setFont('HW',18); c.drawRightString(W-M,by+qs2+8,'let’s book it')
footer(c,2); c.save()

# ---------------- Wordmarks ----------------
from PIL import ImageDraw, ImageFont
def wm(fg,acc,path):
    S=400; f=ImageFont.truetype(FONTS+'Montserrat-Light.ttf',S); h=ImageFont.truetype(FONTS+'ReenieBeanie.ttf',int(S*0.48))
    sp=int(S*0.05); txt='GRANT'; widths=[f.getlength(ch) for ch in txt]; gw=int(sum(widths)+sp*(len(txt)-1))
    im=Image.new('RGBA',(gw+80,int(S*1.55)),(0,0,0,0)); d=ImageDraw.Draw(im); x=40
    for ch,w in zip(txt,widths): d.text((x,20),ch,font=f,fill=fg); x+=w+sp
    tw=h.getlength('the band'); d.text((40+gw-tw,int(S*0.95)),'the band',font=h,fill=acc)
    im.crop(im.getbbox()).save(path)
# ---------------- Press kit zip ----------------
BIO="""GRANT the band

SHORT BIO (for listings and flyers)
GRANT the band is a six-piece indie rock band from Long Island with a horn section and a live show built to move a room.

FULL BIO
GRANT the band is a six-piece indie rock band from Long Island with a horn section and a live show built to move a room. They play originals off their EP Meroke Lane alongside the covers people came for. Two summers as the residency band at Cooper Bluff, plus The Stephen Talkhouse, 89 North, Piquet Lane Tennis & Swim Club, The Villager and Nag's Head Ale House.

MEROKE LANE (EP, out everywhere)
1. Meroke  2. Horizon  3. Peace of Mind  4. Waking Up  5. Man on a Train

FORMATS
Full band with horns (6-piece) | Trio or duo, acoustic | Sets of 2 to 3 hours | We bring our own PA

LINKS
Booking and contact: contact@granttheband.com
Website: granttheband.com
Spotify: https://open.spotify.com/album/6sBrvYJHa66nYqVTg6bNa2
YouTube: https://www.youtube.com/@GRANTtheband
Instagram: @grant_theband
"""
tmp=tempfile.mkdtemp(); K=os.path.join(tmp,'GRANT-the-band-Press-Kit')
for d in ['Photos','Logos','Music']: os.makedirs(os.path.join(K,d))
cp=lambda a,b: shutil.copy(a,os.path.join(K,b))
cp(EPK_OUT,'GRANT-the-band_EPK.pdf'); cp('public/press/grant-the-band-stage-plot.pdf','GRANT-the-band_Stage-Plot.pdf')
for a,b in [('89north-full-band.jpg','Photos/GRANT-the-band_Live_89-North_Full-Band.jpg'),('89north-noah-trombone.jpg','Photos/GRANT-the-band_Live_89-North_Noah-and-Horns.jpg'),('talkhouse-stage.jpg','Photos/GRANT-the-band_Live_Talkhouse_Stage.jpg'),('talkhouse-noah.jpg','Photos/GRANT-the-band_Live_Talkhouse_Noah_Vertical.jpg'),('talkhouse-drums.jpg','Photos/GRANT-the-band_Live_Talkhouse_Drums.jpg'),('gtb-monogram.png','Logos/GRANT-the-band_Monogram_White.png'),('gtb-monogram.svg','Logos/GRANT-the-band_Monogram_White.svg'),('meroke-lane-cover.jpg','Music/Meroke-Lane_EP_Cover.jpg')]:
    cp(IMG+a,b)
wm((244,235,221,255),(246,203,138,255),os.path.join(K,'Logos/GRANT-the-band_Wordmark_Light.png'))
wm((16,21,28,255),(174,95,42,255),os.path.join(K,'Logos/GRANT-the-band_Wordmark_Dark.png'))
open(os.path.join(K,'Bio.txt'),'w').write(BIO)
out='public/press/grant-the-band-press-kit.zip'
if os.path.exists(out): os.remove(out)
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
    for root,_,files in os.walk(K):
        for f in sorted(files):
            p=os.path.join(root,f); z.write(p,os.path.relpath(p,tmp))
print('Built',EPK_OUT,'and',out)
