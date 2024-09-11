const toggleThemeBtn = document.querySelector("#toggle-theme");

toggleThemeBtn.addEventListener("click", () => {
    if (localStorage.theme === "dark") {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
    } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }
});

document.getElementById("add-task-btn").addEventListener("click", function () {
    document.getElementById("task-input-section").classList.remove("hidden");
    document.getElementById("initial-section").classList.add("hidden");
    document.getElementById("add-task-btn").classList.add("hidden");
    document.querySelector(".task-container").style.display = "flex";
});

document.querySelector("#list_item").addEventListener("click", function () {
    document.getElementById("content-list").classList.remove("hidden");
    document.querySelector(".not-click").classList.add("hidden");
    document.querySelector(".clicked").classList.remove("hidden");
});

document.addEventListener('DOMContentLoaded', function () {
    const dateElement = document.querySelector('.date-chang');
    const today = new Date();
    moment.loadPersian({usePersianDigits: true});
    dateElement.textContent = moment(today).format('dddd، jD jMMMM jYYYY');
});

document.addEventListener('DOMContentLoaded', function () {
    const closeButton = document.querySelector('.close-btn');
    const taskInputSection = document.getElementById('task-input-section');
    const addTaskButton = document.getElementById('add-task-btn');

    closeButton.addEventListener('click', function () {
        taskInputSection.classList.add('hidden');
        addTaskButton.classList.remove('hidden');
    });
});

//order
function sortTasks(tsk) {
    return tsk.sort((a, b) => {
        return b.important - a.important;
    });
}

let storage = localStorage.getItem("tasks");
let tasks = storage ? JSON.parse(storage) : [];
let completedTasks = localStorage.getItem("completedTasks")
    ? JSON.parse(localStorage.getItem("completedTasks"))
    : [];

document.addEventListener("DOMContentLoaded", () => {
    tasks = sortTasks(tasks);
    tasks.forEach((task) => {
        document
            .querySelector(".task-container")
            .insertAdjacentHTML("beforeend", task.html);
    });
    completedTasks.forEach((task) => {
        document
            .querySelector(".completed-tasks")
            .insertAdjacentHTML("beforeend", task.html);
    });
    document.getElementById("task-number-completed").textContent =
        completedTasks.length;
    attachDeleteAndEditEvents();
    if (tasks.length > 0) {
        document.getElementById("initial-section").classList.add("hidden");
        document.getElementById("task-number").textContent = tasks.length;
    }
});

let selected;

function selectImportantLevel(event) {
    selected = event.target;

    document.querySelector(".content-list-ul").classList.add("hidden")
    document.getElementById("content-list").innerHTML += selected.outerHTML;

}

document.querySelector(".task-btn").addEventListener("click", addTask);

function addTask() {

    console.log(selected.textContent.trim());
    const tasksIndex = Math.random();
    let taskName = document.getElementById("name-txt").value;
    let taskDetails = document.getElementById("distribution-txt").value;
    const taskHTML = ` 
 
  <div class="flex flex-col gap-3">
  
    <div data-id="${tasksIndex}" class="task-item flex items-center justify-between gap-5 pl-5 border dark:border-[#091120] border-[#E9E9E9] rounded-[12px] w-[744px] h-[105px] py-4 dark:bg-[#091120] bg-[#FFFFFF] mt-6 mr-[434px] dark:shadow-none shadow-custom">
            
        <div class="flex gap-5">
  
    <div style='border-radius: 8px 0px 0px 8px; background-color:${
        selected.textContent.trim() === "بالا"
            ? "#FF5F37"
            : selected.textContent.trim() === "متوسط"
                ? "#FFAF37"
                : "#11A483"
    };' class="block w-[4px] h-[78px]">
    
    </div>
    
    <div class="flex items-center">
    
      <input class="rounded[5px] border border-[#CCCCCC] checkTask w-[18px] h-[18px] mb-5" type="checkbox" id="" />
      
    </div>
    
    <div class="flex flex-col gap-1 justify-center">
    
      <div class="flex gap-4 important-text">
      
        <div class="taskname dark:text-white text-black">${taskName}</div>
        
        ${selected.outerHTML} 
        
      </div>
      
        <div class="taskdetail text-[#727272]">${taskDetails}</div>
        
    </div>
    
  </div>
  
  <div class="flex flex-col gap-1 pl-0 pb-6">
  
    <svg class="actions-menu self-end" width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
   
      <circle cx="2" cy="2" r="2" class=" dark:fill-white fill-[#525252]" />
      <circle cx="2" cy="9" r="2" class=" dark:fill-white fill-[#525252]" />
      <circle cx="2" cy="16" r="2" class=" dark:fill-white fill-[#525252]" />
      
    </svg>

    
    <div class="flex hidden p-[5px] gap-2.5 rounded-[8px] task-actions border border-[#EBEDEF] dark:border-[#293242] w-[78px] h-[34px] justify-evenly ">
    
      <svg class="delete" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
      
        <path d="M4 7H20M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7M10 12L14 16M14 12L10 16"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="dark:stroke-white stroke-[#525252]"/>
        
      </svg>
      
      <div class="w-[1px] h-[20px] dark:bg-[#293242] bg-[#EBEDEF]"></div>
      
      <svg class="edit" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      
        <path d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="dark:stroke-white stroke-[#525252]"/>
        
        <path d="M16 4.99998L19 7.99998M20.385 6.58499C20.7788 6.19114 21.0001 5.65697 21.0001 5.09998C21.0001 4.543 20.7788 4.00883 20.385 3.61498C19.9912 3.22114 19.457 2.99988 18.9 2.99988C18.343 2.99988 17.8088 3.22114 17.415 3.61498L9 12V15H12L20.385 6.58499Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="dark:stroke-white stroke-[#525252]"/>
        
      </svg>
      
    </div>
    
  </div>
  
</div>
            <div class="mr-[434px] w-[744px]  hidden edit-container p-4 gap-5 rounded-[12px] border border-[#E9E9E9] dark:border-[#3D3D3D] dark:shadow-none shadow-custom bg-[#FFFFF] dark:bg-[#060C18]">
            
            <div class="flex flex-col gap-3 justify-center">
            
              <div class="flex gap-4">
              
                <input id="input-taskname" class="dark:focus:outline-none focus:outline-none bg-[#FFFFF] dark:bg-[#060C18] dark:text-[#FFFFFF] text-[#242424]" type="text" value="${taskName}" />
                
              </div>
              
              <input id="input-taskdetail" value="${taskDetails}" class="text-[#727272] dark:focus:outline-none focus:outline-none bg-[#FFFFF] dark:bg-[#060C18]"/>
              
                ${selected.outerHTML}
             
            </div>
            
            <div class="w-full p-4 mt-5 flex justify-end border-t dark:border-[#3D3D3D] border-[#E9E9E9]">
            
              <button class="opacity-60 dark:bg-[#002247] bg-[#007BFF] edit-btn text-[#fff] rounded-[6px] py-1.5 px-4  " >ویرایش تسک</button>
              
            </div>
            
          </div>
          
          </div>`;
    tasks.push({
        important:
            selected.textContent.trim() === "بالا"
                ? 3
                : selected.textContent.trim() === "متوسط"
                    ? 2
                    : 1,
        id: tasksIndex,
        html: taskHTML,
    });

    tasks = sortTasks(tasks);
    document.querySelector(".task-container").innerHTML = "";
    tasks.forEach((task) => {
        document
            .querySelector(".task-container")
            .insertAdjacentHTML("beforeend", task.html);
    });

    attachDeleteAndEditEvents();

    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("task-input-section").classList.add("hidden");
    document.getElementById("task-number").textContent = tasks.length
    document.getElementById("name-txt").value = "";
    document.getElementById("distribution-txt").value = "";
    document.getElementById("add-task-btn").classList.remove("hidden");
    document.querySelector(".content-list-ul").classList.remove("hidden")
    document.getElementById("content-list").lastElementChild.remove()
}

function attachDeleteAndEditEvents() {

    document.querySelectorAll(".delete").forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", deleteTask);
    });

    document.querySelectorAll(".actions-menu").forEach((action) => {
        const menu = action.nextElementSibling;

        action.addEventListener("click", () => {
            if (menu.classList.contains("hidden")) {
                menu.classList.remove("hidden");
            } else {
                menu.classList.add("hidden");
            }
        });

    });

    document.querySelectorAll(".edit").forEach((editBtn) => {

        console.log(editBtn);

        const editBox = editBtn.parentElement.parentElement.parentElement.nextElementSibling
        editBtn.addEventListener("click", () => {
            if (editBox.classList.contains("hidden")) {
                return editBox.classList.remove("hidden")
            }
            return editBox.classList.add("hidden")
        });

    });

    document.querySelectorAll(".checkTask").forEach((check) => {
        check.addEventListener("change", endTask);
    });

    document.querySelectorAll(".edit-btn").forEach((check) => {
        check.addEventListener("click", updateTask);
    });

}

function updateTask(event) {

    const taskElement = event.target.parentElement.parentElement.previousElementSibling;
    const inputsParent = event.target.parentElement.parentElement
    const inputName = inputsParent.querySelector("#input-taskname").value;
    const inputdetail = inputsParent.querySelector("#input-taskdetail").value;
    const taskId = parseFloat(taskElement.getAttribute("data-id"));
    taskElement.querySelector(".taskname").textContent = inputName;
    taskElement.querySelector(".taskdetail").textContent = inputdetail;

    const taskHTML =
        `<div class="flex flex-col gap-3">

            <div data-id="${taskId}" class="task-item flex items-center justify-between gap-5 pl-5 border dark:border-[#091120] border-[#E9E9E9] rounded-[12px] w-[744px] h-[105px]  py-4 dark:bg-[#091120] bg-[#FFFFFF] mt-6 mr-[434px] dark:shadow-none shadow-custom">
           
  <div class="flex gap-5">
  
    <div style='border-radius: 8px 0px 0px 8px;background-color:${
        
        taskElement.querySelector(".important-level").textContent.trim() === "بالا"
            ? "#FF5F37"
            : taskElement.querySelector(".important-level").textContent.trim() === "متوسط"
                ? "#FFAF37"
                : "#11A483"
    };' class="block w-[4px] h-[78px]">
    
    </div>
    
    <div class="flex items-center">
    
      <input class="rounded[5px] border border-[#CCCCCC] w-[18px] h-[18px] checkTask mb-5" type="checkbox" id="" />
      
    </div>
    
    <div class="flex flex-col gap-1 justify-center">
    
      <div class="flex gap-4 important-text">
      
        <div class="taskname dark:text-white text-black">${inputName}</div>
        
        ${taskElement.querySelector(".important-level").outerHTML} 
        
      </div>
      
        <div class="taskdetail text-[#727272]">${inputdetail}</div>
        
    </div>
    
  </div>
  
  <div class="flex flex-col gap-1 pl-0 pb-6">
  
    <svg class="actions-menu self-end" width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      
  <circle cx="2" cy="2" r="2" class=" dark:fill-white fill-[#525252]" />
  <circle cx="2" cy="9" r="2" class=" dark:fill-white fill-[#525252]" />
  <circle cx="2" cy="16" r="2" class=" dark:fill-white fill-[#525252]" />
      
    </svg>
    
    <div class="flex hidden p-[5px] gap-2.5 rounded-[8px] task-actions border border-[#EBEDEF] dark:border-[#293242] w-[78px] h-[34px] justify-evenly">
    
      <svg class="delete" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      
        <path d="M4 7H20M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7M10 12L14 16M14 12L10 16"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="dark:stroke-white stroke-[#525252]"/>
        
      </svg>
      
         <div class="w-[1px] h-[20px] dark:bg-[#293242] bg-[#EBEDEF]"></div>
         
      <svg class="edit" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      
        <path d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="dark:stroke-white stroke-[#525252]"/>
        
        <path d="M16 4.99998L19 7.99998M20.385 6.58499C20.7788 6.19114 21.0001 5.65697 21.0001 5.09998C21.0001 4.543 20.7788 4.00883 20.385 3.61498C19.9912 3.22114 19.457 2.99988 18.9 2.99988C18.343 2.99988 17.8088 3.22114 17.415 3.61498L9 12V15H12L20.385 6.58499Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="dark:stroke-white stroke-[#525252]"/>
        
      </svg>
      
    </div>
    
  </div>
  
</div>
            <div class="mr-[434px] w-[744px]  hidden edit-container p-4 gap-5 rounded-[12px] border border-[#E9E9E9] dark:border-[#3D3D3D] dark:shadow-none shadow-custom bg-[#FFFFF] dark:bg-[#060C18]">
            
            <div class="flex flex-col gap-3 justify-center">
            
              <div class="flex gap-4">
              
                <input id="input-taskname" class="dark:focus:outline-none focus:outline-none bg-[#FFFFF] dark:bg-[#060C18] dark:text-[#FFFFFF] text-[#242424]" type="text" value="${inputName}" />
                
              </div>
              
              <input id="input-taskdetail" value="${inputdetail}" class="text-[#727272] dark:focus:outline-none focus:outline-none bg-[#FFFFF] dark:bg-[#060C18]"/>
              
              <div class="gap-2 rounded-[4px] dark:bg-[#3D2327] dark:border-[#3D2327] bg-[#FFE2DB] border-[#FFE2DB] w-[31px] h-[23px] px-2 py-0.5 text-[12px] text-[#FF5F37] font-semibold cursor-pointer">
              
                ${taskElement.querySelector(".important-level").outerHTML} 
                
              </div>
              
            </div>
            
            <div class="w-full p-4 mt-5 flex justify-end border-t dark:border-[#3D3D3D] border-[#E9E9E9]">
            
              <button class="opacity-60 dark:bg-[#002247] bg-[#007BFF] edit-btn text-[#fff] rounded-[6px] py-1.5 px-4 " >ویرایش تسک</button>
              
            </div>
            
          </div>
          
          </div>`

    tasks = tasks.map((t) => {
        if (t.id === taskId) {
            t.html = taskHTML;
        }
        return t;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function endTask(event) {

    let taskIndex = Math.random();

    const taskElement = event.target.closest("div[data-id]");

    if (event.target.checked) {

        const completedHTML =
            ` <div data-id="${taskIndex}" 
 
                class="flex items-center justify-between gap-5 pl-5 border dark:border-[#091120] border-[#E9E9E9] rounded-[12px] w-[744px] h-[74px] py-4 dark:bg-[#091120] bg-[#FFFFFF] mt-6 mr-[434px] dark:shadow-none shadow-custom">
                
            <div class="flex gap-5 dark:text-white text-black"> 
            
                <div style="border-radius: 8px 0px 0px 8px;background-color:${

                taskElement.querySelector(".important-level").textContent.trim() === "بالا"
                    ? "#FF5F37"
                    : taskElement.querySelector(".important-level").textContent.trim() === "متوسط"
                        ? "#FFAF37"
                        : "#11A483"
            };" class="block w-[4px] h-[48px]">
                </div>
                
                  <div class="flex items-center">
                  
                      <input class="rounded[5px] border border-[#CCCCCC] w-[18px] h-[18px] completed-checkbox pointer-events-none" checked type="checkbox" name="" id="" />
                      
                  </div>
                  
                  <div class="flex flex-col gap-1 justify-center dark:text-white text-black">
                  
                    <div class="flex gap-4">
                    
                      <del>${

                taskElement.querySelector(".taskname").textContent

            }</del>
                        ${taskElement.querySelector(".important-level").outerHTML} 
                        
                    </div>
                    
                  </div>
                  
              </div> 
              
                  <svg id="delete-completed-task" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  
                  <path d="M4 7H20M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7M10 12L14 16M14 12L10 16"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="dark:stroke-white stroke-[#525252]"/>
                  
                  </svg>
          </div>`;

        completedTasks.push({id: taskIndex, html: completedHTML});

        document.querySelector(".completed-tasks").innerHTML = ""
        completedTasks.forEach((task) => {
            document
                .querySelector(".completed-tasks")
                .insertAdjacentHTML("beforeend", task.html);

        });

        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

        //del old task
        const taskId = parseFloat(taskElement.getAttribute("data-id"));
        tasks = tasks.filter((t) => t.id !== taskId);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskElement.remove();

        //bind delete btn
        document.querySelectorAll("#delete-completed-task").forEach(btn => {
            btn.addEventListener("click", deleteCompletedTask)
        })

        document.getElementById("task-number").textContent = tasks.length;
        document.getElementById("task-number-completed").textContent =
            completedTasks.length;
    }
}

function deleteCompletedTask(event) {

    const taskElement = event.target.closest("div[data-id]");
    const taskId = parseFloat(taskElement.getAttribute("data-id"));
    completedTasks = completedTasks.filter((t) => t.id !== taskId);
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    taskElement.remove();
    document.getElementById("task-number-completed").textContent = completedTasks.length;
}

function deleteTask(event) {

    const taskElement = event.target.closest("div[data-id]");
    const taskId = parseFloat(taskElement.getAttribute("data-id"));
    tasks = tasks.filter((t) => t.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskElement.remove();
    document.getElementById("task-number").textContent = tasks.length;

}
