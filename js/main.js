// Portfolio — สคริปต์หลัก (ไม่ใช้เฟรมเวิร์ก)
(function () {
  'use strict';

  var reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var SECTION_IDS = ['about', 'skill', 'project', 'contact'];

  /* =========================================================
     ข้อมูลโปรเจกต์ (แหล่งข้อมูลเดียวของ section My Project)
     - เพิ่ม/แก้โปรเจกต์ที่นี่ที่เดียว การ์ดจะถูกสร้างอัตโนมัติ
     - ช่องที่จำเป็น: no, title, desc, type, team, tech (อย่างน้อย 1), github
       ถ้าขาดช่องใด การ์ดนั้นจะถูกซ่อนอัตโนมัติ (ดู console)
     - demo ไม่บังคับ: ถ้าเว้นว่าง จะไม่แสดงปุ่ม Demo
     - ชื่อใน tech ที่ตรงกับ key ใน TECH_ICONS จะแสดงเป็นไอคอน
       ชื่ออื่น ๆ จะแสดงเป็นป้ายข้อความ (chip) อัตโนมัติ
     - เรียงจากโปรเจกต์ใหญ่/ยาก ไปเล็ก/ง่าย (รูปใช้ชื่อ projectN.jpg ตามเลข no)
     ========================================================= */
  var PROJECTS = [
    {
      no: '01',
      title: 'KinRaiDee',
      desc: 'แนะนำเมนูอาหารไทยตามความชอบและอาหารที่แพ้ มี LLM ช่วยแนะนำ และวิเคราะห์พฤติกรรมการกิน ฉันรับผิดชอบ Frontend',
      type: 'Web',
      team: 'Team',
      teamSize: 2,
      tech: ['Angular', 'Spring Boot', 'PostgreSQL', 'Ollama'],
      image: 'images/projects/project1.jpg',
      // ซอร์สเต็มเป็น private: ลิงก์ไป repo เดโม (frontend) แทน
      github: 'https://github.com/natcha-runsri/KinRaiDee-Demo',
      demo: 'https://natcha-runsri.github.io/KinRaiDee-Demo/'
    },
    {
      no: '02',
      title: 'Auoyoo',
      desc: 'เว็บแนะนำและเปรียบเทียบอุปกรณ์ไอทีตามงบและการใช้งาน พร้อมตารางเทียบสเปกและราคา ฉันรับผิดชอบ Frontend และ UX/UI',
      type: 'Web',
      team: 'Team',
      teamSize: 2,
      tech: ['Angular', 'Spring Boot', 'PostgreSQL', 'Ollama'],
      image: 'images/projects/project2.png',
      // ซอร์สเต็มเป็น private: ลิงก์ไป repo เดโม (frontend) แทน
      github: 'https://github.com/natcha-runsri/Auoyoo-Demo',
      demo: 'https://natcha-runsri.github.io/Auoyoo-Demo/'
    },
    {
      no: '03',
      title: 'Weather Monitor',
      desc: 'แอปแสดงผลสถานีวัดอากาศ IoT ออกแบบให้อ่านค่าเซนเซอร์ผ่าน NETPIE ตอนนี้ถอดชุดฮาร์ดแวร์แล้ว เดโมจึงไม่มีค่าจากเซนเซอร์',
      type: 'IoT',
      team: 'Team',
      teamSize: 3,
      tech: ['Flutter', 'Dart', 'NETPIE', 'Firebase'],
      image: 'images/projects/project3.png',
      github: 'https://github.com/natcha-runsri/Weather_App',
      demo: 'https://natcha-runsri.github.io/Weather_App/'
    },
    {
      no: '04',
      title: 'Office Supplies Management',
      desc: 'ระบบจัดการวัสดุและอุปกรณ์สำนักงาน แยกสิทธิ์ Admin / Employee ดูแลคลังอุปกรณ์ ผู้ใช้ และคำขอยืม ผ่าน REST API',
      type: 'Web',
      team: 'Solo',
      tech: ['JavaScript', 'Node.js', 'Express', 'MySQL', 'Docker'],
      image: 'images/projects/project4.png',
      github: 'https://github.com/natcha-runsri/Office-Supplies-Equipment-Management',
      demo: 'https://natcha-runsri.github.io/Office-Supplies-Equipment-Management/'   
    },
    {
      no: '05',
      title: 'Movie Booking',
      desc: 'แอปจองตั๋วหนัง ดูตัวอย่างหนัง เลือกรอบฉายและที่นั่ง ชำระเงินแบบจำลอง แล้วรับตั๋วเป็น QR Code',
      type: 'Mobile',
      team: 'Team',
      teamSize: 2,
      tech: ['Flutter', 'Dart', 'Firebase'],
      image: 'images/projects/project5.png',
      github: 'https://github.com/natcha-runsri/Movie_App',
      demo: 'https://natcha-runsri.github.io/Movie_App/'
    },
    {
      no: '06',
      title: 'Money Management',
      desc: 'แอปบันทึกรายรับ-รายจ่าย ตั้งงบตามหมวด ติดตามบิลพร้อมแจ้งเตือน และสรุปการใช้จ่ายเป็นกราฟ',
      type: 'Mobile',
      team: 'Solo',
      tech: ['Flutter', 'Dart', 'Firebase'],
      image: 'images/projects/project6.png',
      github: 'https://github.com/natcha-runsri/Money_Manage_App',
      demo: 'https://natcha-runsri.github.io/Money_Manage_App/'
    }
  ];

  function prefersReducedMotion() {
    return reduceMotionQuery.matches;
  }

  function scrollBehavior() {
    return prefersReducedMotion() ? 'auto' : 'smooth';
  }

  // 1) Animation ตอนโหลดหน้า (Hero): หัวข้อ → โฟลเดอร์ → Developer (หน่วงเวลาตั้งใน --reveal-delay)
  function revealHero() {
    // ใช้ requestAnimationFrame 2 ครั้ง ให้เบราว์เซอร์วาดสถานะเริ่มต้นก่อน transition จึงทำงาน
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.documentElement.classList.add('is-loaded');
      });
    });
  }

  // 2) คลิกแท็บ (ทั้งในโฟลเดอร์ Hero และแท็บแฟ้มของแต่ละ section) → เลื่อนแบบ smooth
  function setupTabScrolling() {
    var links = document.querySelectorAll('.folder__tabs a[href^="#"], .section-tabs a[href^="#"]');

    links.forEach(function (link) {
      link.addEventListener('click', function (event) {
        var id = link.getAttribute('href').slice(1);
        var target = document.getElementById(id);
        if (!target) return; // ไม่มี section ปลายทาง → ปล่อยให้ลิงก์ทำงานปกติ

        event.preventDefault();
        target.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });

        // ย้ายโฟกัสไปยัง section เพื่อผู้ใช้คีย์บอร์ด/โปรแกรมอ่านหน้าจอ
        target.focus({ preventScroll: true });

        if (history.replaceState) {
          history.replaceState(null, '', '#' + id);
        }
      });
    });
  }

  // 3) ไฮไลต์แท็บที่ active ตาม section ที่อยู่กลางจอ
  //    - แท็บที่อยู่ "ใน" section (เช่น #about, #skill) ไฮไลต์แท็บของ section ตัวเองเสมอ
  //      (กำหนดใน HTML ด้วย is-active) เพราะแท็บ active ต้องมีสีพื้นเดียวกับ section นั้น
  //    - แท็บที่อยู่นอก section (เช่น เมนูติดหัวจอในอนาคต) จะเปลี่ยนตาม section ที่อยู่บนจอ
  function setActiveTab(id) {
    document.querySelectorAll('.section-tabs .ftab').forEach(function (tab) {
      if (tab.closest('section[id]')) return;
      var isActive = tab.getAttribute('href') === '#' + id;
      tab.classList.toggle('is-active', isActive);
      if (isActive) {
        tab.setAttribute('aria-current', 'true');
      } else {
        tab.removeAttribute('aria-current');
      }
    });
  }

  function setupActiveTabObserver() {
    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActiveTab(entry.target.id);
      });
    }, {
      // นับว่า "อยู่บนจอ" เมื่อ section ตัดผ่านแถบกลางจอ
      rootMargin: '-45% 0px -50% 0px'
    });

    SECTION_IDS.forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  // 4) เมื่อ section เข้าจอ: รูป slide จากซ้าย ข้อความ slide จากขวา (ทำครั้งเดียว)
  function setupRevealOnView() {
    var sections = document.querySelectorAll('section');
    var targets = Array.prototype.filter.call(sections, function (section) {
      return section.querySelector('[data-inview], [data-stagger]');
    });

    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      targets.forEach(function (section) { section.classList.add('is-inview'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-inview');
        obs.unobserve(entry.target); // ทำครั้งเดียว
      });
    }, { threshold: 0.2 });

    targets.forEach(function (section) { observer.observe(section); });
  }

  // 5) ปุ่มกลับขึ้นด้านบน
  function setupBackToTop() {
    document.querySelectorAll('.to-top').forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: scrollBehavior() });

        var main = document.getElementById('main');
        if (main) main.focus({ preventScroll: true });

        if (history.replaceState) {
          history.replaceState(null, '', location.pathname + location.search);
        }
      });
    });
  }

  /* =========================================================
     MY PROJECT: สร้างการ์ด + ตัวเลื่อน (carousel)
     ========================================================= */

  // ไอคอนเทค (inline SVG ชุดเดียวกับหน้า My Skill)
  var TECH_ICONS = {
    'JavaScript': '<rect width="24" height="24" rx="3" fill="#F7DF1E"/><text x="21.2" y="20.6" text-anchor="end" font-family="Figtree, Arial, sans-serif" font-weight="800" font-size="10.5" fill="#1F1F1F">JS</text>',
    'Node.js': '<path fill="#5FA04E" d="M12 1.8 21 7v10l-9 5.2L3 17V7Z"/><text x="12" y="15.4" text-anchor="middle" font-family="Figtree, Arial, sans-serif" font-weight="800" font-size="8.5" fill="#fff">JS</text>',
    'Express': '<text x="12" y="15.6" text-anchor="middle" font-family="Figtree, Arial, sans-serif" font-weight="600" font-size="11" letter-spacing="-.3" fill="#1F1F1F">ex</text>',
    'MySQL': '<path fill="#00758F" d="M2.6 18.6C3.8 13 8.4 7.8 14.9 7.6c1.6 0 3 .5 4 1.4-.9.1-1.7.6-2 1.3 1.6.6 2.6 1.9 2.9 3.7-1.2-.9-2.7-1.2-4.1-.9-2.8.6-4.6 2.8-5.2 5.5-1.9-.9-4.8-1.1-7.9 0Z"/><path fill="#F29111" d="M14.8 5.6c.5-1.4 1.7-2.4 3.1-2.7-.4 1.1-.3 2.3.3 3.3-1.2-.4-2.4-.6-3.4-.6Z"/>',
    'Docker': '<path fill="#2496ED" d="M2.4 11.8h17c.7-1 1.8-1.4 2.6-1.2-.2 1.1-1.1 1.8-2.1 1.9-1.1 4-4.7 6.7-9.9 6.7-4.4 0-7.2-2.7-7.6-7.4Z"/><g fill="#2496ED"><rect x="4.4" y="8.6" width="2.6" height="2.6" rx=".3"/><rect x="7.6" y="8.6" width="2.6" height="2.6" rx=".3"/><rect x="10.8" y="8.6" width="2.6" height="2.6" rx=".3"/><rect x="14" y="8.6" width="2.6" height="2.6" rx=".3"/><rect x="7.6" y="5.4" width="2.6" height="2.6" rx=".3"/><rect x="10.8" y="5.4" width="2.6" height="2.6" rx=".3"/><rect x="10.8" y="2.2" width="2.6" height="2.6" rx=".3"/></g>',
    'Flutter': '<path fill="#47C5FB" d="M14.3 1.5 3.8 12l3.3 3.3L20.9 1.5Z"/><path fill="#47C5FB" d="M14.3 11.2 8.6 16.9l5.7 5.6h6.6l-5.7-5.7 5.7-5.6Z"/><path fill="#00569E" d="M14.3 22.5h6.6l-5.7-5.7-3.3 3.2Z"/>',
    'Dart': '<path fill="#0175C2" d="M4 8.5 8.5 4h8l3.5 3.5v8L15.5 20h-8L4 16.5Z"/><path fill="#13B9FD" d="M8.5 4 20 15.5h-4.5l-7-7Z"/>',
    'Firebase': '<path fill="#FFA000" d="M4.5 19.3 7.6 3.2c.1-.6.9-.7 1.2-.2l3.2 6Z"/><path fill="#F57C00" d="M13.2 11.4 15 7.9c.3-.5 1-.5 1.2 0l3.3 11.4Z"/><path fill="#FFCA28" d="M4.5 19.3 16 7.7c.4-.4 1.1-.2 1.2.3l2.3 11.3-6.6 3.6c-.6.3-1.3.3-1.9 0Z"/>',
    'API': '<g fill="none" stroke="#1F2B3D" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17.5a4.5 4.5 0 0 1-.6-9 6 6 0 0 1 11.4 1.6A3.8 3.8 0 0 1 17.5 17.5Z"/><path d="M10 13.5h4M12 11.5v4"/></g>',
    // ไอคอนด้านล่างคัดลอกจาก Simple Icons v16.38.0 (CC0 1.0, https://simpleicons.org)
    // ย่อเหลือ ~21px ในกรอบ 24 ให้ขนาดใกล้ไอคอนเดิม; Angular/Ollama ใช้สีเข้ม #1F1F1F แบบ Express
    'Angular': '<path fill="#1F1F1F" transform="translate(1.5 1.5) scale(.875)" d="M16.712 17.711H7.288l-1.204 2.916L12 24l5.916-3.373-1.204-2.916ZM14.692 0l7.832 16.855.814-12.856L14.692 0ZM9.308 0 .662 3.999l.814 12.856L9.308 0Zm-.405 13.93h6.198L12 6.396 8.903 13.93Z"/>',
    'Spring Boot': '<path fill="#6DB33F" transform="translate(1.5 1.5) scale(.875)" d="m23.693 10.7058-4.73-8.1844c-.4094-.7106-1.4166-1.2942-2.2402-1.2942H7.2725c-.819 0-1.8308.5836-2.2402 1.2942L.307 10.7058c-.4095.7106-.4095 1.873 0 2.5837l4.7252 8.189c.4094.7107 1.4166 1.2943 2.2402 1.2943h9.455c.819 0 1.826-.5836 2.2402-1.2942l4.7252-8.189c.4095-.7107.4095-1.8732 0-2.5838zM10.9763 5.7547c0-.5365.4377-.9742.9742-.9742s.9742.4377.9742.9742v5.8217c0 .5366-.4377.9742-.9742.9742s-.9742-.4376-.9742-.9742zm.9742 12.4294c-3.6427 0-6.6077-2.965-6.6077-6.6077.0047-2.0896.993-4.0521 2.6685-5.304a.8657.8657 0 0 1 1.2142.1788.8657.8657 0 0 1-.1788 1.2143c-2.1602 1.6048-2.612 4.6592-1.0072 6.8194 1.6049 2.1603 4.6593 2.612 6.8195 1.0072 1.2378-.9177 1.9673-2.372 1.9673-3.9157a4.8972 4.8972 0 0 0-1.9861-3.925c-.386-.2824-.466-.8284-.1836-1.2143.2824-.386.8283-.466 1.2143-.1835 1.6895 1.2471 2.6826 3.2238 2.6873 5.3228 0 3.6474-2.965 6.6077-6.6077 6.6077z"/>',
    'PostgreSQL': '<path fill="#4169E1" transform="translate(1.5 1.5) scale(.875)" d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z"/>',
    'Ollama': '<path fill="#1F1F1F" transform="translate(1.5 1.5) scale(.875)" d="M16.361 10.26a.894.894 0 0 0-.558.47l-.072.148.001.207c0 .193.004.217.059.353.076.193.152.312.291.448.24.238.51.3.872.205a.86.86 0 0 0 .517-.436.752.752 0 0 0 .08-.498c-.064-.453-.33-.782-.724-.897a1.06 1.06 0 0 0-.466 0zm-9.203.005c-.305.096-.533.32-.65.639a1.187 1.187 0 0 0-.06.52c.057.309.31.59.598.667.362.095.632.033.872-.205.14-.136.215-.255.291-.448.055-.136.059-.16.059-.353l.001-.207-.072-.148a.894.894 0 0 0-.565-.472 1.02 1.02 0 0 0-.474.007Zm4.184 2c-.131.071-.223.25-.195.383.031.143.157.288.353.407.105.063.112.072.117.136.004.038-.01.146-.029.243-.02.094-.036.194-.036.222.002.074.07.195.143.253.064.052.076.054.255.059.164.005.198.001.264-.03.169-.082.212-.234.15-.525-.052-.243-.042-.28.087-.355.137-.08.281-.219.324-.314a.365.365 0 0 0-.175-.48.394.394 0 0 0-.181-.033c-.126 0-.207.03-.355.124l-.085.053-.053-.032c-.219-.13-.259-.145-.391-.143a.396.396 0 0 0-.193.032zm.39-2.195c-.373.036-.475.05-.654.086-.291.06-.68.195-.951.328-.94.46-1.589 1.226-1.787 2.114-.04.176-.045.234-.045.53 0 .294.005.357.043.524.264 1.16 1.332 2.017 2.714 2.173.3.033 1.596.033 1.896 0 1.11-.125 2.064-.727 2.493-1.571.114-.226.169-.372.22-.602.039-.167.044-.23.044-.523 0-.297-.005-.355-.045-.531-.288-1.29-1.539-2.304-3.072-2.497a6.873 6.873 0 0 0-.855-.031zm.645.937a3.283 3.283 0 0 1 1.44.514c.223.148.537.458.671.662.166.251.26.508.303.82.02.143.01.251-.043.482-.08.345-.332.705-.672.957a3.115 3.115 0 0 1-.689.348c-.382.122-.632.144-1.525.138-.582-.006-.686-.01-.853-.042-.57-.107-1.022-.334-1.35-.68-.264-.28-.385-.535-.45-.946-.03-.192.025-.509.137-.776.136-.326.488-.73.836-.963.403-.269.934-.46 1.422-.512.187-.02.586-.02.773-.002zm-5.503-11a1.653 1.653 0 0 0-.683.298C5.617.74 5.173 1.666 4.985 2.819c-.07.436-.119 1.04-.119 1.503 0 .544.064 1.24.155 1.721.02.107.031.202.023.208a8.12 8.12 0 0 1-.187.152 5.324 5.324 0 0 0-.949 1.02 5.49 5.49 0 0 0-.94 2.339 6.625 6.625 0 0 0-.023 1.357c.091.78.325 1.438.727 2.04l.13.195-.037.064c-.269.452-.498 1.105-.605 1.732-.084.496-.095.629-.095 1.294 0 .67.009.803.088 1.266.095.555.288 1.143.503 1.534.071.128.243.393.264.407.007.003-.014.067-.046.141a7.405 7.405 0 0 0-.548 1.873c-.062.417-.071.552-.071.991 0 .56.031.832.148 1.279L3.42 24h1.478l-.05-.091c-.297-.552-.325-1.575-.068-2.597.117-.472.25-.819.498-1.296l.148-.29v-.177c0-.165-.003-.184-.057-.293a.915.915 0 0 0-.194-.25 1.74 1.74 0 0 1-.385-.543c-.424-.92-.506-2.286-.208-3.451.124-.486.329-.918.544-1.154a.787.787 0 0 0 .223-.531c0-.195-.07-.355-.224-.522a3.136 3.136 0 0 1-.817-1.729c-.14-.96.114-2.005.69-2.834.563-.814 1.353-1.336 2.237-1.475.199-.033.57-.028.776.01.226.04.367.028.512-.041.179-.085.268-.19.374-.431.093-.215.165-.333.36-.576.234-.29.46-.489.822-.729.413-.27.884-.467 1.352-.561.17-.035.25-.04.569-.04.319 0 .398.005.569.04a4.07 4.07 0 0 1 1.914.997c.117.109.398.457.488.602.034.057.095.177.132.267.105.241.195.346.374.43.14.068.286.082.503.045.343-.058.607-.053.943.016 1.144.23 2.14 1.173 2.581 2.437.385 1.108.276 2.267-.296 3.153-.097.15-.193.27-.333.419-.301.322-.301.722-.001 1.053.493.539.801 1.866.708 3.036-.062.772-.26 1.463-.533 1.854a2.096 2.096 0 0 1-.224.258.916.916 0 0 0-.194.25c-.054.109-.057.128-.057.293v.178l.148.29c.248.476.38.823.498 1.295.253 1.008.231 2.01-.059 2.581a.845.845 0 0 0-.044.098c0 .006.329.009.732.009h.73l.02-.074.036-.134c.019-.076.057-.3.088-.516.029-.217.029-1.016 0-1.258-.11-.875-.295-1.57-.597-2.226-.032-.074-.053-.138-.046-.141.008-.005.057-.074.108-.152.376-.569.607-1.284.724-2.228.031-.26.031-1.378 0-1.628-.083-.645-.182-1.082-.348-1.525a6.083 6.083 0 0 0-.329-.7l-.038-.064.131-.194c.402-.604.636-1.262.727-2.04a6.625 6.625 0 0 0-.024-1.358 5.512 5.512 0 0 0-.939-2.339 5.325 5.325 0 0 0-.95-1.02 8.097 8.097 0 0 1-.186-.152.692.692 0 0 1 .023-.208c.208-1.087.201-2.443-.017-3.503-.19-.924-.535-1.658-.98-2.082-.354-.338-.716-.482-1.15-.455-.996.059-1.8 1.205-2.116 3.01a6.805 6.805 0 0 0-.097.726c0 .036-.007.066-.015.066a.96.96 0 0 1-.149-.078A4.857 4.857 0 0 0 12 3.03c-.832 0-1.687.243-2.456.698a.958.958 0 0 1-.148.078c-.008 0-.015-.03-.015-.066a6.71 6.71 0 0 0-.097-.725C8.997 1.392 8.337.319 7.46.048a2.096 2.096 0 0 0-.585-.041Zm.293 1.402c.248.197.523.759.682 1.388.03.113.06.244.069.292.007.047.026.152.041.233.067.365.098.76.102 1.24l.002.475-.12.175-.118.178h-.278c-.324 0-.646.041-.954.124l-.238.06c-.033.007-.038-.003-.057-.144a8.438 8.438 0 0 1 .016-2.323c.124-.788.413-1.501.696-1.711.067-.05.079-.049.157.013zm9.825-.012c.17.126.358.46.498.888.28.854.36 2.028.212 3.145-.019.14-.024.151-.057.144l-.238-.06a3.693 3.693 0 0 0-.954-.124h-.278l-.119-.178-.119-.175.002-.474c.004-.669.066-1.19.214-1.772.157-.623.434-1.185.68-1.382.078-.062.09-.063.159-.012z"/>'
  };

  // ไอคอนแทนรูปเมื่อยังไม่มีไฟล์ภาพ
  var PLACEHOLDER_ICONS = {
    Web: '<rect x="3" y="4" width="18" height="16" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 8.5h18" stroke="currentColor" stroke-width="1.6"/><circle cx="6" cy="6.3" r=".8" fill="currentColor"/><circle cx="8.5" cy="6.3" r=".8" fill="currentColor"/><path d="M8 14l-2 1.5L8 17M16 14l2 1.5-2 1.5M13 12.5l-2 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    Mobile: '<rect x="7" y="2.5" width="10" height="19" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10.5 5h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="18.5" r=".9" fill="currentColor"/><path d="M9.5 9.5h5M9.5 12h5M9.5 14.5h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    Soon: '<path d="M12 4v16M4 12h16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'
  };

  // มุมเอียงสลับทิศ: ใบคี่ (1,3,...) -3 ถึง -4deg, ใบคู่ (2,4,...) +2 ถึง +4deg
  var CARD_TILTS = [-3.5, 3, -3, 2.5, -4, 3.5, -3, 2];

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  // ตรวจว่าข้อมูลครบพอจะแสดงการ์ดหรือไม่ (ช่องสำรอง comingSoon แสดงเป็นการ์ด "Coming soon")
  function isCompleteProject(project) {
    if (project.comingSoon) return Boolean(project.no);
    var required = ['no', 'title', 'desc', 'type', 'team', 'github'];
    var ok = required.every(function (key) { return project[key]; }) &&
      Array.isArray(project.tech) && project.tech.length > 0;
    if (!ok && window.console) {
      console.warn('[Portfolio] ซ่อนการ์ดโปรเจกต์เพราะข้อมูลไม่ครบ:', project);
    }
    return ok;
  }

  function binderSvg() {
    return '<svg class="pcard__binder" viewBox="0 0 120 130" aria-hidden="true" focusable="false">' +
      '<path class="pcard__wire" d="M38 66 52 18M82 66 68 18"/><ellipse class="pcard__wire" cx="60" cy="14" rx="14" ry="8"/>' +
      '<path class="pcard__binder-body" d="M32 60h56l14 50H18Z"/>' +
      '<path fill="#F4F1E4" opacity=".85" d="M46 60h8L44 110h-8ZM70 60h6l10 50h-6Z"/>' +
      '<rect class="pcard__binder-body" x="2" y="106" width="116" height="20" rx="10"/></svg>';
  }

  function polaroidHtml(project, iconKey) {
    var img = project.image
      ? '<img src="' + escapeHtml(project.image) + '" alt="ภาพหน้าจอโปรเจกต์ ' + escapeHtml(project.title) + '" width="320" height="200" loading="lazy" decoding="async">'
      : '';
    return '<div class="polaroid__img">' +
      '<svg class="polaroid__placeholder" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + PLACEHOLDER_ICONS[iconKey] + '</svg>' +
      img + '</div>';
  }

  function projectCardHtml(project, index) {
    var colorIndex = index % 4;
    var style = 'style="--tilt: ' + CARD_TILTS[index % CARD_TILTS.length] + 'deg; --i: ' + index + '"';

    // การ์ดช่องสำรอง "Coming soon"
    if (project.comingSoon) {
      return '<li class="slide">' +
        '<article class="pcard pcard--c' + colorIndex + ' pcard--soon" ' + style + ' aria-labelledby="pcard-title-' + index + '">' +
          binderSvg() +
          '<div class="pcard__paper">' +
            '<figure class="polaroid">' + polaroidHtml({}, 'Soon') + '</figure>' +
            '<div class="pcard__meta"><p class="pcard__no" aria-hidden="true">' + escapeHtml(project.no) + '</p></div>' +
            '<h3 class="pcard__title" id="pcard-title-' + index + '">Coming soon<span class="visually-hidden"> — โปรเจกต์ใหม่เร็วๆ นี้</span></h3>' +
            '<p class="pcard__desc pcard__desc--soon" lang="th">กำลังพัฒนาโปรเจกต์ใหม่</p>' +
          '</div>' +
        '</article></li>';
    }

    var teamLabel = project.team + (project.teamSize ? ' · ' + project.teamSize : '');
    var many = project.tech.length > 4;
    var techItems = project.tech.map(function (name) {
      var icon = TECH_ICONS[name];
      // ไม่มีไอคอน → แสดงเป็นป้ายข้อความ (ไม่วาดโลโก้แบรนด์เอง)
      if (!icon) return '<li class="pcard__chip">' + escapeHtml(name) + '</li>';
      return '<li title="' + escapeHtml(name) + '"><svg viewBox="0 0 24 24" role="img" aria-label="' + escapeHtml(name) + '" focusable="false">' + icon + '</svg></li>';
    }).join('');

    var demo = project.demo
      ? '<a class="pbtn" href="' + escapeHtml(project.demo) + '" target="_blank" rel="noopener">Demo <span aria-hidden="true">→</span><span class="visually-hidden"> ของ ' + escapeHtml(project.title) + ' (แท็บใหม่)</span></a>'
      : '';

    return '<li class="slide">' +
      '<article class="pcard pcard--c' + colorIndex + (project.featured ? ' pcard--featured' : '') + '" ' + style + ' aria-labelledby="pcard-title-' + index + '">' +
        binderSvg() +
        '<div class="pcard__paper">' +
          '<figure class="polaroid">' +
            polaroidHtml(project, project.type === 'Web' ? 'Web' : 'Mobile') +   // IoT (แอป Flutter) ใช้ไอคอนมือถือ
            '<p class="pcard__tags"><span class="tag tag--type">' + escapeHtml(project.type) + '</span><span class="tag tag--team">' + escapeHtml(teamLabel) + '</span></p>' +
            '<svg class="pcard__clip" viewBox="0 0 32 64" aria-hidden="true" focusable="false"><path d="M12 22V9a6 6 0 0 1 12 0v38a9 9 0 0 1-18 0V17"/></svg>' +
          '</figure>' +
          '<div class="pcard__meta">' +
            '<p class="pcard__no" aria-hidden="true">' + escapeHtml(project.no) + '</p>' +
            (project.featured ? '<p class="pcard__star"><span aria-hidden="true">⭐</span> Featured</p>' : '') +
          '</div>' +
          '<h3 class="pcard__title" id="pcard-title-' + index + '">' +
            // ลิงก์คลุมทั้งการ์ด (stretched link)
            '<a class="pcard__link" href="' + escapeHtml(project.github) + '" target="_blank" rel="noopener">' + escapeHtml(project.title) +
            '<span class="visually-hidden"> (เปิด GitHub ในแท็บใหม่)</span></a></h3>' +
          '<p class="pcard__desc" lang="th">' + escapeHtml(project.desc) + '</p>' +
          '<ul class="pcard__tech' + (many ? ' pcard__tech--many' : '') + '" aria-label="เทคโนโลยีที่ใช้">' + techItems + '</ul>' +
        '</div>' +
        '<div class="pcard__actions">' +
          '<a class="pbtn" href="' + escapeHtml(project.github) + '" target="_blank" rel="noopener">GitHub <span aria-hidden="true">→</span><span class="visually-hidden"> ของ ' + escapeHtml(project.title) + ' (แท็บใหม่)</span></a>' +
          demo +
        '</div>' +
      '</article></li>';
  }

  function renderProjects(track) {
    var list = PROJECTS.filter(isCompleteProject);
    track.innerHTML = list.map(projectCardHtml).join('');

    // รูปที่ยังไม่มีไฟล์: ซ่อน <img> ให้เห็นพื้นไล่สี + ไอคอนแทน (ไม่แสดงไอคอนรูปเสีย)
    track.querySelectorAll('.polaroid__img img').forEach(function (img) {
      img.addEventListener('load', function () { img.classList.add('is-loaded'); });
      img.addEventListener('error', function () { img.remove(); });
      if (img.complete && img.naturalWidth > 0) img.classList.add('is-loaded');
    });
  }

  function setupProjectCarousel() {
    var root = document.querySelector('[data-carousel]');
    if (!root) return;

    var viewport = root.querySelector('.carousel__viewport');
    var track = root.querySelector('.carousel__track');
    var prevBtn = root.querySelector('.carousel__btn--prev');
    var nextBtn = root.querySelector('.carousel__btn--next');
    var dotsWrap = root.querySelector('.carousel__dots');
    var status = root.querySelector('.carousel__status');

    renderProjects(track);
    var slides = Array.prototype.slice.call(track.children);
    var total = slides.length;
    if (!total) return;

    var page = 0;          // หน้าปัจจุบัน (เริ่มที่ 0)
    var lastStart = 0;     // การ์ดใบแรกของหน้าปัจจุบัน (ใช้คงตำแหน่งตอน resize)
    var lastStatus = '';
    var dots = [];

    // การ์ดซ้ายซ้อนทับการ์ดขวา (ขอบซ้ายของการ์ดถัดไปเป็นพื้นที่ว่าง จึงไม่บังชื่อ/ป้าย/ไอคอน)
    slides.forEach(function (slide, i) { slide.style.zIndex = String(total - i); });

    // จำนวนการ์ดต่อหน้า อ่านจาก CSS (--per-view: 3 / 2 / 1)
    function perView() {
      var value = parseInt(getComputedStyle(root).getPropertyValue('--per-view'), 10);
      return Math.max(1, Math.min(value || 1, total));
    }
    // จำนวนหน้า = ceil(จำนวนการ์ด / การ์ดต่อหน้า)
    function pageCount() { return Math.ceil(total / perView()); }
    function clampPage(p) { return Math.max(0, Math.min(p, pageCount() - 1)); }
    // การ์ดใบแรกของหน้า (หน้าสุดท้ายชิดขวา ให้แสดงเต็มหน้าเสมอ)
    function pageStart(p) { return Math.max(0, Math.min(p * perView(), total - perView())); }
    function slideOffset(i) { return slides[i].offsetLeft - slides[0].offsetLeft; }
    function pageOffset(p) { return slideOffset(pageStart(p)); }

    // จุดบอกหน้า: 1 จุดต่อ 1 หน้า (สร้างใหม่เมื่อจำนวนหน้าเปลี่ยน เช่นตอน resize)
    function buildDots() {
      var count = pageCount();
      if (dots.length === count) return;
      dotsWrap.textContent = '';
      dots = [];
      for (var i = 0; i < count; i++) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel__dot';
        dot.setAttribute('aria-label', 'ไปหน้า ' + (i + 1) + ' จาก ' + count);
        dot.addEventListener('click', goToPage.bind(null, i));
        dotsWrap.appendChild(dot);
        dots.push(dot);
      }
    }

    // ให้ scroll-snap หยุดเฉพาะต้นหน้า → ปัดนิ้ว/trackpad เลื่อนทีละหน้าเหมือนปุ่ม
    // มีหน้าเดียว: ซ่อนจุดและลูกศร
    function updateControls() {
      var count = pageCount();
      var starts = [];
      for (var p = 0; p < count; p++) starts.push(pageStart(p));
      slides.forEach(function (slide, i) { slide.classList.toggle('is-snap', starts.indexOf(i) !== -1); });

      var scrollable = count > 1;
      prevBtn.hidden = !scrollable;
      nextBtn.hidden = !scrollable;
      dotsWrap.hidden = !scrollable;
      root.classList.toggle('is-static', !scrollable);
    }

    // แสดงสถานะของหน้า p: การ์ดนอกหน้า inert, จุด active, ลูกศร disabled, ประกาศ aria-live
    function applyPage(p) {
      var pv = perView();
      var start = pageStart(p);
      lastStart = start;
      slides.forEach(function (slide, i) {
        var visible = i >= start && i < start + pv;
        slide.inert = !visible;   // ไม่ให้ Tab ไปโดนการ์ดที่มองไม่เห็น
        slide.classList.toggle('is-visible', visible);
      });
      dots.forEach(function (dot, i) {
        if (i === p) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      setDisabled(prevBtn, p <= 0);
      setDisabled(nextBtn, p >= pageCount() - 1);

      var text = pageCount() > 1 ? 'หน้า ' + (p + 1) + ' จาก ' + pageCount() : '';
      if (text !== lastStatus) {
        status.textContent = text;
        lastStatus = text;
      }
    }

    function setDisabled(btn, disabled) {
      btn.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    }

    // ระหว่างเลื่อนด้วยปุ่ม/จุด/คีย์บอร์ด ไม่ให้ตำแหน่งกลางทางไปเปลี่ยนสถานะ (กันกระพริบและประกาศซ้ำ)
    var pendingPage = null;
    var pendingTimer;

    function goToPage(p, focusFirst) {
      var target = clampPage(p);
      page = target;
      applyPage(target);
      pendingPage = target;
      clearTimeout(pendingTimer);
      pendingTimer = setTimeout(function () { pendingPage = null; }, 1000);
      viewport.scrollTo({ left: pageOffset(target), behavior: scrollBehavior() });
      if (focusFirst === true) {
        var el = slides[pageStart(target)].querySelector('a, button');
        if (el) el.focus({ preventScroll: true });
      }
    }

    // หน้าที่ใกล้ตำแหน่ง scroll ปัจจุบันที่สุด (ใช้ตอนผู้ใช้ปัด/เลื่อนเอง)
    function nearestPage() {
      var best = 0;
      var bestDist = Infinity;
      for (var p = 0; p < pageCount(); p++) {
        var dist = Math.abs(viewport.scrollLeft - pageOffset(p));
        if (dist < bestDist) { bestDist = dist; best = p; }
      }
      return best;
    }

    var ticking = false;
    viewport.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        if (pendingPage !== null) {
          if (Math.abs(viewport.scrollLeft - pageOffset(pendingPage)) < 2) pendingPage = null;
          return;
        }
        var p = nearestPage();
        if (p !== page) {
          page = p;
          applyPage(p);
        }
      });
    }, { passive: true });

    prevBtn.addEventListener('click', function () {
      if (prevBtn.getAttribute('aria-disabled') !== 'true') goToPage(page - 1);
    });
    nextBtn.addEventListener('click', function () {
      if (nextBtn.getAttribute('aria-disabled') !== 'true') goToPage(page + 1);
    });

    // คีย์บอร์ด ←/→ เมื่อ focus อยู่ในตัวเลื่อน: เลื่อนทีละหน้า
    root.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      if (pageCount() <= 1) return;   // หน้าเดียว: ไม่ดักปุ่มลูกศร
      event.preventDefault();
      var target = clampPage(event.key === 'ArrowRight' ? page + 1 : page - 1);
      if (target === page) return;
      // ถ้า focus อยู่ในการ์ด ย้าย focus ไปการ์ดแรกของหน้าใหม่ (การ์ดเดิมจะกลายเป็น inert)
      var inCard = event.target.closest && event.target.closest('.slide');
      goToPage(target, Boolean(inCard));
    });

    // เปลี่ยนขนาดจอ: คำนวณจำนวนหน้าใหม่ และอยู่หน้าที่มีการ์ดใบแรกที่เคยเห็น
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        page = clampPage(Math.floor(lastStart / perView()));
        buildDots();
        updateControls();
        applyPage(page);
        viewport.scrollTo({ left: pageOffset(page), behavior: 'auto' });
      }, 150);
    });

    buildDots();
    updateControls();
    applyPage(0);
  }

  function init() {
    setupProjectCarousel();
    setupTabScrolling();
    setupActiveTabObserver();
    setupRevealOnView();
    setupBackToTop();
    revealHero();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
