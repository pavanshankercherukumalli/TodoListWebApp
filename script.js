function formatTime(t) {
    const [h, m] = t.split(":");
    const hour = parseInt(h);
    const suffix = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${suffix}`;
  }
  
  function addTask() {
    const taskInput = document.getElementById("taskInput").value.trim();
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
  
    if (taskInput && startTime && endTime) {
      const li = document.createElement("li");
  
      const taskText = document.createElement("span");
      taskText.className = "task-text";
      taskText.textContent = `${formatTime(startTime)} – ${formatTime(endTime)}  ${taskInput}`;
      taskText.addEventListener("click", () => li.classList.toggle("completed"));
  
      const actions = document.createElement("div");
      actions.className = "task-actions";
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => li.remove();
  
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "edit-btn";
      editBtn.onclick = () => {
        const [start, , end, ...taskParts] = taskText.textContent.split(/–| /).filter(Boolean);
        document.getElementById("startTime").value = to24Hr(start);
        document.getElementById("endTime").value = to24Hr(end);
        document.getElementById("taskInput").value = taskParts.join(" ");
        li.remove();
      };
  
      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);
  
      li.appendChild(taskText);
      li.appendChild(actions);
      document.getElementById("taskList").appendChild(li);
  
      document.getElementById("taskInput").value = "";
      document.getElementById("startTime").value = "";
      document.getElementById("endTime").value = "";
    }
  }
  
  // Convert time like 10:00 AM to 24-hour (for edit)
  function to24Hr(time) {
    const [hourStr, minStr] = time.split(":");
    let hour = parseInt(hourStr);
    let minutes = minStr.slice(0, 2);
    const suffix = minStr.slice(2).trim();
  
    if (suffix === "PM" && hour !== 12) hour += 12;
    if (suffix === "AM" && hour === 12) hour = 0;
    return `${hour.toString().padStart(2, "0")}:${minutes}`;
  }
  
  function updateDateTime() {
    const now = new Date();
    document.getElementById("current-date").textContent = now.toLocaleDateString();
    document.getElementById("current-time").textContent = now.toLocaleTimeString();
  }
  
  updateDateTime();
  setInterval(updateDateTime, 1000);
  
  // Theme toggle
  document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
  