// العناصر
const form = document.getElementById("attendance-form");
const tableBody = document.querySelector("#attendance-table tbody");
const themeToggle = document.getElementById("theme-toggle");
const countPresent = document.getElementById("count-present");
const countAbsent = document.getElementById("count-absent");
const countLate = document.getElementById("count-late");
const searchInput = document.getElementById("search-input");

// تحميل البيانات من التخزين المحلي
let records = JSON.parse(localStorage.getItem("attendanceData")) || [];

// تحديث الإحصائيات
function updateStats() {
  const p = records.filter(r => r.status === "present").length;
  const a = records.filter(r => r.status === "absent").length;
  const l = records.filter(r => r.status === "late").length;
  countPresent.textContent = p;
  countAbsent.textContent = a;
  countLate.textContent = l;
}

// عرض الجدول
function renderTable(filtered = null) {
  tableBody.innerHTML = "";
  const data = filtered || records;
  data.forEach((rec, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${rec.name}</td>
      <td>${rec.className}</td>
      <td>${rec.status === "present" ? "✅ حاضر" :
        rec.status === "absent" ? "❌ غائب" : "⏰ متأخر"}</td>
      <td>${rec.date}</td>
      <td>
        <button class="edit-btn" data-index="${index}">✏️</button>
        <button class="delete-btn" data-index="${index}">🗑️</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
  updateStats();
}

// أول تشغيل
renderTable();

// عند الإضافة
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("student-name").value.trim();
  const className = document.getElementById("student-class").value.trim();
  const status = document.getElementById("status").value;

  if (!name || !className || !status) {
    alert("من فضلك أكمل جميع الحقول.");
    return;
  }

  const record = {
    name,
    className,
    status,
    date: new Date().toLocaleDateString()
  };

  records.push(record);
  localStorage.setItem("attendanceData", JSON.stringify(records));
  renderTable();
  form.reset();
});

// تعديل أو حذف
tableBody.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  if (e.target.classList.contains("edit-btn")) {
    const newStatus = prompt("أدخل الحالة الجديدة (present / absent / late):", records[index].status);
    if (!["present", "absent", "late"].includes(newStatus)) {
      alert("حالة غير صحيحة.");
      return;
    }
    records[index].status = newStatus;
    localStorage.setItem("attendanceData", JSON.stringify(records));
    renderTable();
  }
  if (e.target.classList.contains("delete-btn")) {
    if (confirm("هل أنت متأكد من حذف هذا الطالب؟")) {
      records.splice(index, 1);
      localStorage.setItem("attendanceData", JSON.stringify(records));
      renderTable();
    }
  }
});

// البحث
searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = records.filter(r => r.name.toLowerCase().includes(term));
  renderTable(filtered);
});

// الوضع الليلي
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
});

// تحميل الوضع المحفوظ
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  themeToggle.textContent = "☀️";
}

// زر الطباعة
document.getElementById("print-btn").addEventListener("click", () => {
  window.print();
});
