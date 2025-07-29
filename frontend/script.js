const apiUrl = "http://localhost:8080/api/students";

document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const student = {
    name: document.getElementById("name").value,
    age: parseInt(document.getElementById("age").value),
    email: document.getElementById("email").value
  };

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student)
  });

  loadStudents();
});

async function loadStudents() {
  const response = await fetch(apiUrl);
  const students = await response.json();

  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";

  students.forEach(student => {
    const row = `
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.email}</td>
        <td>
          <button onclick="deleteStudent(${student.id})">Delete</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

async function deleteStudent(id) {
  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  loadStudents();
}

loadStudents();
