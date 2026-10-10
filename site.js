/* Grace Bible Church - shared script. Edit ANNOUNCEMENTS and EVENTS below; no other code changes needed. */
var VERSES=[["The LORD is my shepherd, I lack nothing.", "Psalm 23:1"], ["For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", "John 3:16"], ["I can do all this through him who gives me strength.", "Philippians 4:13"], ["Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.", "Proverbs 3:5-6"], ["So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.", "Isaiah 41:10"], ["“For I know the plans I have for you,” declares the LORD, “plans to prosper you and not to harm you, plans to give you hope and a future.”", "Jeremiah 29:11"], ["And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", "Romans 8:28"], ["Come to me, all you who are weary and burdened, and I will give you rest.", "Matthew 11:28"], ["God is our refuge and strength, an ever-present help in trouble.", "Psalm 46:1"], ["Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.", "Joshua 1:9"], ["Your word is a lamp for my feet, a light on my path.", "Psalm 119:105"], ["Because of the LORD’s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.", "Lamentations 3:22-23"], ["For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.", "Ephesians 2:8-9"], ["But seek first his kingdom and his righteousness, and all these things will be given to you as well.", "Matthew 6:33"], ["The LORD is my light and my salvation—whom shall I fear? The LORD is the stronghold of my life—of whom shall I be afraid?", "Psalm 27:1"], ["But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.", "Isaiah 40:31"], ["And now these three remain: faith, hope and love. But the greatest of these is love.", "1 Corinthians 13:13"], ["I lift up my eyes to the mountains—where does my help come from? My help comes from the LORD, the Maker of heaven and earth.", "Psalm 121:1-2"], ["Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", "Philippians 4:6"], ["Now faith is confidence in what we hope for and assurance about what we do not see.", "Hebrews 11:1"], ["Jesus answered, “I am the way and the truth and the life. No one comes to the Father except through me.”", "John 14:6"], ["Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.", "Matthew 28:19"], ["Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!", "2 Corinthians 5:17"], ["Take delight in the LORD, and he will give you the desires of your heart.", "Psalm 37:4"], ["But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.", "Galatians 5:22-23"], ["If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.", "James 1:5"], ["Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty.", "Psalm 91:1"], ["I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing.", "John 15:5"], ["He has shown you, O mortal, what is good. And what does the LORD require of you? To act justly and to love mercy and to walk humbly with your God.", "Micah 6:8"], ["Rejoice always, pray continually, give thanks in all circumstances; for this is God’s will for you in Christ Jesus.", "1 Thessalonians 5:16-18"], ["But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.", "Romans 5:8"]];

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


  /* ---------- language (Google Translate, loaded only when a language is chosen) ---------- */
  var LANGS=[["en","English"],["te","\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41 (Telugu)"],["hi","\u0939\u093F\u0928\u094D\u0926\u0940 (Hindi)"],["ta","\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD (Tamil)"],["kn","\u0C95\u0CA8\u0CCD\u0CA8\u0CA1 (Kannada)"],["ml","\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02 (Malayalam)"]];
  function getLang(){var m=document.cookie.match(/(?:^|; )googtrans=\/en\/([a-z]{2})/);return m?m[1]:"en"}
  function setCookie(v,days){
    var host=location.hostname,exp=days<0?"; expires=Thu, 01 Jan 1970 00:00:00 GMT":"";
    document.cookie="googtrans="+v+"; path=/"+exp;
    if(host.indexOf(".")>-1){document.cookie="googtrans="+v+"; path=/; domain="+host+exp;document.cookie="googtrans="+v+"; path=/; domain=."+host.replace(/^www\./,"")+exp}
  }
  var sel=$("#lang");
  if(sel){
    var cur=getLang();
    LANGS.forEach(function(l){var o=document.createElement("option");o.value=l[0];o.textContent=l[1];if(l[0]===cur)o.selected=true;sel.appendChild(o)});
    sel.addEventListener("change",function(){
      var c=sel.value;
      if(c==="en"){setCookie("/en/en",-1);setCookie("",-1)}else{setCookie("/en/"+c,1)}
      location.reload();
    });
    if(cur!=="en"){
      window.gtInit=function(){new google.translate.TranslateElement({pageLanguage:"en",includedLanguages:"te,hi,ta,kn,ml",autoDisplay:false},"google_translate_element")};
      var sc=document.createElement("script");sc.src="https://translate.google.com/translate_a/element.js?cb=gtInit";sc.async=true;document.head.appendChild(sc);
      document.documentElement.setAttribute("data-lang",cur);
    }
  }

  /* ---------- search ---------- */
  var rs=$("#results");
  if(rs&&typeof SEARCH_INDEX!=="undefined"){
    var q=(new URLSearchParams(location.search).get("q")||"").trim(),qi=$("#q");
    if(qi)qi.value=q;
    var info=$("#resultinfo");
    function esc(s){return s.replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
    if(!q){info.textContent="Type a word above, such as prayer, Sunday, Zoom or giving."}
    else{
      var terms=q.toLowerCase().split(/\s+/).filter(Boolean),res=[];
      SEARCH_INDEX.forEach(function(p){
        var tl=p.t.toLowerCase(),xl=p.x.toLowerCase(),score=0,ok=true;
        terms.forEach(function(t){var inT=tl.indexOf(t)>-1,n=xl.split(t).length-1;if(!inT&&!n){ok=false}score+=(inT?10:0)+Math.min(n,5)});
        if(ok)res.push({p:p,s:score});
      });
      res.sort(function(a,b){return b.s-a.s});
      info.textContent=res.length?res.length+" result"+(res.length>1?"s":"")+" for \u201c"+q+"\u201d":"No results for \u201c"+q+"\u201d. Try another word.";
      res.forEach(function(r){
        var x=r.p.x,low=x.toLowerCase(),pos=low.indexOf(terms[0]);if(pos<0)pos=0;
        var st=Math.max(0,pos-60),sn=(st>0?"\u2026":"")+x.substr(st,170)+(st+170<x.length?"\u2026":"");
        sn=esc(sn);terms.forEach(function(t){sn=sn.replace(new RegExp("("+t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")","ig"),"<mark>$1</mark>")});
        var d=document.createElement("div");d.className="row";d.style.gridTemplateColumns="1fr";
        d.innerHTML='<div><h3><a href="'+r.p.u+'" style="text-decoration:none;color:inherit">'+esc(r.p.t)+'</a></h3><p>'+sn+'</p><a class="more" href="'+r.p.u+'">Open page</a></div>';
        rs.appendChild(d);
      });
    }
  }

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
