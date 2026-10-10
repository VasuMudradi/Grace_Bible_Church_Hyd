/* Grace Bible Church - shared script. Edit ANNOUNCEMENTS and EVENTS below; no other code changes needed. */
var VERSES=[["The LORD is my shepherd; I shall not want.", "Psalm 23:1"], ["For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.", "John 3:16"], ["I can do all things through Christ which strengtheneth me.", "Philippians 4:13"], ["Trust in the LORD with all thine heart; and lean not unto thine own understanding.", "Proverbs 3:5"], ["Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.", "Isaiah 41:10"], ["For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.", "Jeremiah 29:11"], ["And we know that all things work together for good to them that love God, to them who are the called according to his purpose.", "Romans 8:28"], ["Come unto me, all ye that labour and are heavy laden, and I will give you rest.", "Matthew 11:28"], ["God is our refuge and strength, a very present help in trouble.", "Psalm 46:1"], ["Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.", "Joshua 1:9"], ["Thy word is a lamp unto my feet, and a light unto my path.", "Psalm 119:105"], ["It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.", "Lamentations 3:22-23"], ["For by grace are ye saved through faith; and that not of yourselves: it is the gift of God.", "Ephesians 2:8"], ["But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.", "Matthew 6:33"], ["The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?", "Psalm 27:1"], ["But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.", "Isaiah 40:31"], ["And now abideth faith, hope, charity, these three; but the greatest of these is charity.", "1 Corinthians 13:13"], ["I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the LORD, which made heaven and earth.", "Psalm 121:1-2"], ["Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.", "Philippians 4:6"], ["Now faith is the substance of things hoped for, the evidence of things not seen.", "Hebrews 11:1"], ["Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.", "John 14:6"], ["Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost.", "Matthew 28:19"], ["Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.", "2 Corinthians 5:17"], ["Delight thyself also in the LORD; and he shall give thee the desires of thine heart.", "Psalm 37:4"], ["But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith.", "Galatians 5:22"], ["If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.", "James 1:5"], ["He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.", "Psalm 91:1"], ["I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit: for without me ye can do nothing.", "John 15:5"], ["He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?", "Micah 6:8"], ["Rejoice evermore. Pray without ceasing. In every thing give thanks: for this is the will of God in Christ Jesus concerning you.", "1 Thessalonians 5:16-18"], ["But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.", "Romans 5:8"]];

/* Add news here. Newest first. Example: {date:"12 Oct 2026", title:"Harvest Thanksgiving", text:"Join us after worship."} */
var ANNOUNCEMENTS=[];

/* Add special meetings here. date is YYYY-MM-DD, time is 24h HH:MM (IST). Example:
   {date:"2026-12-24", time:"19:00", title:"Christmas Carol Service", text:"Carols, a short message and fellowship."} */
var EVENTS=[];

/* Weekly rhythm. dow: 0=Sun..6=Sat or "*" for every day. nth: which weekday of the month (number, array, or -1 for last). */
var WEEKLY=[
 {t:"Daily Bible Reading",dow:"*",h:6,m:0,len:30},
 {t:"Sunday School",dow:0,h:9,m:0,len:50},
 {t:"Sunday Worship",dow:0,h:10,m:0,len:120},
 {t:"Missionary Outreach",dow:0,nth:3,h:14,m:0,len:120},
 {t:"Men's Meeting",dow:3,nth:[1,3],h:18,m:0,len:60},
 {t:"Wednesday Prayer Meeting",dow:3,h:19,m:0,len:75},
 {t:"Friday Book Reading",dow:5,h:18,m:30,len:90},
 {t:"All Night Prayer",dow:5,nth:-1,h:22,m:0,len:420},
 {t:"Women's Fellowship",dow:6,nth:2,h:16,m:0,len:90}
];

(function(){
  function $(s,r){return (r||document).querySelector(s)}
  function $all(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
  function istNow(){var f=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Kolkata",hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date()),o={};f.forEach(function(p){o[p.type]=p.value});return Date.UTC(+o.year,+o.month-1,+o.day,+o.hour,+o.minute,+o.second)}
  function pad(n){return (n<10?"0":"")+n}
  function t12(h,m){var ap=h>=12?"PM":"AM",hh=h%12||12;return hh+":"+pad(m)+" "+ap}
  var DAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  /* scripture banner: one verse per day */
  var now=istNow(),d=new Date(now),doy=Math.floor((Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate())-Date.UTC(d.getUTCFullYear(),0,0))/864e5);
  var vv=VERSES[doy%VERSES.length];
  $all("[data-verse-text]").forEach(function(e){e.textContent=vv[0]});
  $all("[data-verse-ref]").forEach(function(e){e.textContent=vv[1]});

  /* menu */
  var mb=$(".menu-btn"),nav=$("nav.main");
  if(mb&&nav)mb.addEventListener("click",function(){var o=nav.classList.toggle("open");mb.setAttribute("aria-expanded",o)});

  /* toast + copy */
  var tt=document.createElement("div");tt.className="toast";tt.setAttribute("role","status");document.body.appendChild(tt);
  function toast(m){tt.textContent=m;tt.classList.add("show");setTimeout(function(){tt.classList.remove("show")},1800)}
  $all("[data-copy]").forEach(function(b){b.addEventListener("click",function(){var v=b.getAttribute("data-copy");(navigator.clipboard?navigator.clipboard.writeText(v):Promise.reject()).then(function(){toast("Copied")},function(){toast(v)})})});

  /* occurrences */
  function nthOf(y,m,day){return Math.floor((day-1)/7)+1}
  function isLast(y,m,day){return day+7>new Date(Date.UTC(y,m+1,0)).getUTCDate()}
  function matches(w,dt){
    if(w.dow!=="*"&&dt.getUTCDay()!==w.dow)return false;
    if(w.nth===undefined)return true;
    var n=nthOf(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate()),L=isLast(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate()),a=[].concat(w.nth);
    return a.some(function(x){return x===-1?L:x===n});
  }
  function upcoming(limit){
    var out=[],base=Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate());
    for(var i=0;i<45;i++){
      var day=new Date(base+i*864e5);
      WEEKLY.forEach(function(w){if(matches(w,day)){var s=base+i*864e5+(w.h*60+w.m)*6e4,e=s+w.len*6e4;if(e>now)out.push({t:w.t,s:s,e:e})}});
      EVENTS.forEach(function(ev){var p=ev.date.split("-"),h=(ev.time||"10:00").split(":");if(Date.UTC(+p[0],+p[1]-1,+p[2])===base+i*864e5){var s=base+i*864e5+(+h[0]*60+ +h[1])*6e4;if(s+36e5>now)out.push({t:ev.title,s:s,e:s+36e5,special:true})}});
    }
    out.sort(function(a,b){return a.s-b.s});
    return out.slice(0,limit||1);
  }
  function fmt(s){var x=new Date(s);return DAYS[x.getUTCDay()]+", "+x.getUTCDate()+" "+MON[x.getUTCMonth()]+" at "+t12(x.getUTCHours(),x.getUTCMinutes())}

  var nb=$("[data-next]");
  function tick(){
    now=istNow();
    if(!nb)return;
    var n=upcoming(1)[0];if(!n)return;
    var live=now>=n.s;
    $("[data-next-lbl]",nb).textContent=live?"Happening now":"Next gathering";
    $("[data-next-what]",nb).textContent=n.t;
    $("[data-next-when]",nb).textContent=fmt(n.s)+" IST";
    var ms=n.s-now,c=$("[data-next-count]",nb);
    if(live){c.textContent="Join us";return}
    var dd=Math.floor(ms/864e5),hh=Math.floor(ms%864e5/36e5),mm=Math.floor(ms%36e5/6e4);
    c.textContent=(dd?dd+"d ":"")+hh+"h "+pad(mm)+"m";
  }
  if(nb){tick();setInterval(tick,30000)}

  /* special meetings + announcements */
  var es=$("[data-events]");
  if(es){
    var list=EVENTS.filter(function(e){var p=e.date.split("-");return Date.UTC(+p[0],+p[1]-1,+p[2])>=Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate())}).sort(function(a,b){return a.date<b.date?-1:1});
    if(!list.length){es.setAttribute("hidden","")}
    else{var box=$("[data-events-list]",es);list.forEach(function(e){var p=e.date.split("-"),h=(e.time||"10:00").split(":");var c=document.createElement("div");c.className="card";var h3=document.createElement("h3");h3.textContent=e.title;var pp=document.createElement("p");pp.textContent=e.text||"";var w=document.createElement("div");w.className="when";w.textContent=new Date(Date.UTC(+p[0],+p[1]-1,+p[2])).toUTCString().slice(0,16)+" - "+t12(+h[0],+h[1]);c.appendChild(h3);c.appendChild(pp);c.appendChild(w);box.appendChild(c)})}
  }
  var an=$("[data-news]");
  if(an){
    if(!ANNOUNCEMENTS.length){an.setAttribute("hidden","")}
    else{var nb2=$("[data-news-list]",an);ANNOUNCEMENTS.forEach(function(a){var c=document.createElement("div");c.className="card";var h3=document.createElement("h3");h3.textContent=a.title;var pp=document.createElement("p");pp.textContent=a.text||"";var w=document.createElement("div");w.className="when";w.textContent=a.date||"";c.appendChild(h3);c.appendChild(pp);if(a.date)c.appendChild(w);nb2.appendChild(c)})}
  }
})();
