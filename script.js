(() => {
  const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const startDate = new Date("2025-09-08");

  // Timetable data
  const subjects = {
    "Monday":["DMGT","SEM","OOP","DLCO","LUNCH","ADSAA LAB","ADSAA LAB","PP"],
    "Tuesday":["SS","DLCO","UHV","DMGT","LUNCH","ADSAA","DMGT","COUN"],
    "Wednesday":["ADSAA","SEM","OOP LAB","OOP LAB","LUNCH","UHV","ADSAA","DLCO"],
    "Thursday":["OOP","SS","DLCO","ADSAA","LUNCH","ES","ADSAA",""],
    "Friday":["DLCO","DMGT","CO-S","OOP","LUNCH","PP LAB","PP LAB",""],
    "Saturday":["UHV","DMGT","LIB","ES","LUNCH","OOP","ADSAA","SPORTS"]
  };

  // Subject links
  const links = {
    "DMGT":"https://youtube.com/playlist?list=PLA1HLruLdexQS6lV4_o3q5J4xehBFgtP7",
    "SEM":"https://youtube.com/@seminartopics618?si=3G9Ioj3Mc8db6fQK",
    "OOP":"https://youtube.com/@jennyslecturescsit?si=PZwQdtIjapt2OYgD",
    "DLCO":"https://youtube.com/playlist?list=PLeIE3weEKo4byP10GgT7WfJjgH9BLJ-Sc&si=LHrWdLZUaVdLu2KI",
    "ADSAA":"https://youtube.com/@uzairjavedakhtar3718?si=AMr_e4h0aEOl7ajO",
    "UHV":"https://youtube.com/@tegronlearninghub?si=pJWy9fF73HP7Qvn9",
    "SS":"https://youtube.com/playlist?list=PLWPirh4EWFpFIElSxplDlEhRDZHkBD-0n&si=CVXt-3CmSY5liQac",
    "COUN":"https://youtube.com/@interviewcoach?si=TBAh2KuYZP3rcmDx",
    "CO-S":"https://youtu.be/Qjx4sibHtuM?si=-GIEv8TyIDrzXWR9",
    "LIB":"https://youtu.be/Qjx4sibHtuM?si=-GIEv8TyIDrzXWR9",
    "ES":"https://youtu.be/Qjx4sibHtuM?si=-GIEv8TyIDrzXWR9",
    "PP":"https://youtu.be/Qjx4sibHtuM?si=-GIEv8TyIDrzXWR9",
    "OOP LAB":"https://youtu.be/Qjx4sibHtuM?si=-GIEv8TyIDrzXWR9",
    "ADSAA LAB":"https://youtu.be/Qjx4sibHtuM?si=-GIEv8TyIDrzXWR9",
    "PP LAB":"https://youtu.be/Qjx4sibHtuM?si=-GIEv8TyIDrzXWR9",
    "SPORTS":"https://youtu.be/Qjx4sibHtuM?si=-GIEv8TyIDrzXWR9"
  };

  const tbody = document.getElementById("timetable-body");
  const searchDateInput = document.getElementById("searchDate");

  function formatDate(d){
    return `${String(d.getDate()).padStart(2,"0")}-${String(d.getMonth()+1).padStart(2,"0")}-${d.getFullYear()}`;
  }

  function toISODate(d){
    return d.toISOString().split("T")[0];
  }

  function buildTimetable(){
    let currentDate = new Date(startDate);
    let html = "";
    for(let week=1; week<=2; week++){
      for(let d=0; d<7; d++){
        const day = daysOfWeek[d];
        const dateStr = formatDate(currentDate);
        const iso = toISODate(currentDate);
        html += `<tr data-date="${iso}">`;
        html += `<td>Week ${week}</td><td>${day}</td><td>${dateStr}</td>`;
        if(day === "Sunday"){
          for(let p=0;p<8;p++) html += `<td class="holiday">Holiday</td>`;
        } else {
          (subjects[day] || []).forEach(sub=>{
            if(sub==="LUNCH") html += `<td class="lunch">LUNCH</td>`;
            else if(sub==="") html += `<td></td>`;
            else html += `<td><a href="${links[sub]||"#"}" target="_blank">${sub}</a></td>`;
          });
        }
        html += "</tr>";
        currentDate.setDate(currentDate.getDate()+1);
      }
    }
    tbody.innerHTML = html;
  }

  function highlightToday(){
    const todayISO = toISODate(new Date());
    [...tbody.querySelectorAll("tr")].forEach(row=>{
      if(row.dataset.date===todayISO) row.classList.add("today");
    });
    searchDateInput.value = todayISO;
  }

  searchDateInput.addEventListener("change",()=>{
    const iso = searchDateInput.value;
    [...tbody.querySelectorAll("tr")].forEach(row=>{
      row.classList.toggle("highlight", row.dataset.date===iso);
    });
  });

  // LOGIN SYSTEM
  const loginOverlay = document.getElementById("loginOverlay");
  const loginBtn = document.getElementById("loginBtn");
  const loginError = document.getElementById("loginError");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const mainContent = document.getElementById("mainContent");
  const welcomeBanner = document.getElementById("welcomeBanner");
  const watermark = document.getElementById("watermark");
  const logoutBtn = document.getElementById("logoutBtn");
  const refreshBtn = document.getElementById("refreshBtn");

  const validUsers = Array.from({length:57},(_,i)=>"249P1A"+(1201+i));
  const validPassword = "12345";

  loginBtn.addEventListener("click",()=>{
    const u = username.value.toUpperCase().trim();
    const p = password.value.trim();
    if(validUsers.includes(u) && p===validPassword){
      loginOverlay.style.display = "none";
      mainContent.style.display = "block";
      welcomeBanner.textContent = "Welcome, "+u;
      watermark.textContent = u;
      buildTimetable();
      highlightToday();
    } else {
      loginError.textContent = "Invalid Register Number or Password";
    }
  });

  logoutBtn.addEventListener("click",()=>{
    mainContent.style.display = "none";
    loginOverlay.style.display = "flex";
    username.value = "";
    password.value = "";
    watermark.textContent = "";
  });

  refreshBtn.addEventListener("click",()=>{
    buildTimetable();
    highlightToday();
  });

})();
