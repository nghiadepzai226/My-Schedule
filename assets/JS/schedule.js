document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector(".main-content");
    const header = document.querySelector(".header h3");
    const dates = document.querySelector(".dates");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    const todo = document.querySelector(".to-do-list");
    const addEventButton = document.querySelector(".add-task-button");
    const closeAddEvent = document.querySelector('.close-event-form');
    const addEvent = document.querySelector(".add-event");
    const eventForm = document.querySelector("#add-event-form");
    const timeInputs = document.querySelectorAll('input[type="time"]');
    const timeSelectMethod = document.querySelector('.select');
    const timeOptions = document.querySelectorAll('.option');
    const noEvent = document.querySelector(".no-event");
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const weekdays = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];


    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let currentDate = date.getDate();
    let currentYear = year;
    let currentMonth = month;
    let selectedDate = {date: `${currentDate}`, month: `${currentMonth + 1}`, year: `${currentYear}`};

    // Render calendar
    async function renderCalendar() {

        let start = new Date(year, month, 1).getDay(); // get weekday of 1st date (0 - 6)
        let endDate = new Date(year, month + 1, 0).getDate(); // get last date of a month, ex: December last date is 31
        let end = new Date(year, month, endDate).getDate(); // get weekday of last date (current month) (0 - 6)
        let endDatePrev = new Date(year, month, 0).getDate(); // get weekday of last date (prev month) (0 - 6)

        let dateContent = "";
        let count = 0;

        let hasTaskdates = await getDates();

        // if exist prev month dates
        if (start !== 0) {
            let i = start;
            let prevMonth = month - 1;
            let prevYear = year;
            if (prevMonth < 0) {
                prevMonth = 11;
                prevYear = year - 1;
            }
            while (i > 0) {
                let targetDate = { date: `${endDatePrev + 1 - i}`, month: `${prevMonth + 1}`, year: `${prevYear}` };
                let exists = hasTaskdates.some(item =>
                    item.date === targetDate.date &&
                    item.month === targetDate.month &&
                    item.year === targetDate.year
                );
                if (exists) {
                    dateContent += createDayHTML(endDatePrev + 1 - i, prevMonth, prevYear, "inactiveDate", "active");
                } else {
                    dateContent += createDayHTML(endDatePrev + 1 - i, prevMonth, prevYear, "inactiveDate");
                }
                i--;
                count++;
            }

        }

        // current month dates
        for (i = 1; i <= end; i++) {
            let targetDate = { date: `${i}`, month: `${month + 1}`, year: `${year}` };
            let exists = hasTaskdates.some(item =>
                item.date === targetDate.date &&
                item.month === targetDate.month &&
                item.year === targetDate.year
            );

            if (exists) {
                if (currentDate == i && currentMonth == month && currentYear == year) {
                    dateContent += createDayHTML(i, month, year, "currentDate", "active");
                } else {
                    dateContent += createDayHTML(i, month, year, "", "active");
                }
            } else {
                if (currentDate == i && currentMonth == month && currentYear == year) {
                    dateContent += createDayHTML(i, month, year, "currentDate");
                } else {
                    dateContent += createDayHTML(i, month, year);
                }
            }
            count++;
        }

        // next month dates if 35 cells are not full
        if (count < 35) {
            let length = 36 - count;
            let nextMonth = month + 1;
            let nextYear = year;
            if (nextMonth > 11) {
                nextMonth = 0;
                nextYear = year + 1;
            }
            for (i = 1; i < length; i++) {
                let targetDate = { date: `${i}`, month: `${nextMonth + 1}`, year: `${nextYear}` };
                let exists = hasTaskdates.some(item =>
                    item.date === targetDate.date &&
                    item.month === targetDate.month &&
                    item.year === targetDate.year
                );
                if (exists) {
                    dateContent += createDayHTML(i, nextMonth, nextYear, "inactiveDate", "active");
                    console.log(`${i} ${nextMonth} ${nextYear}`);
                } else {
                    dateContent += createDayHTML(i, nextMonth, nextYear, "inactiveDate");
                }
            }
        }

        header.textContent = `${months[month]} ${year}`;
        dates.innerHTML = dateContent;

        if(selectedDate) {
            document.querySelectorAll('.dates li').forEach(item => {
                if(
                    item.getAttribute("data-date") == selectedDate.date &&
                    item.getAttribute("data-month") == selectedDate.month &&
                    item.getAttribute("data-year") == selectedDate.year
                ) {
                    item.classList.add("selected");
                }
            });
        }

    }

    // Create <li> elment
    function createDayHTML(date, month, year, additionalClass = "", hasTask = "") {
        return `
            <li
                data-date = "${date}"
                data-month = "${month + 1}"
                data-year = "${year}"
                class = "${additionalClass}" >
                ${date}
                <div class = 'taskStatus ${hasTask}'></div>
            </li>
        `;
    }

    // prev button
    function showPrevMonth() {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        renderCalendar();
    }

    // next button
    function showNextMonth() {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        renderCalendar();
    }

    // select date function
    function selectionDate(e) {
        if (e.target.tagName === 'LI') {
            // remove all selected
            document.querySelectorAll(".dates li").forEach(item => {
                item.classList.remove("selected");
            });

            e.target.classList.add("selected");

            selectedDate = {
                date: e.target.getAttribute("data-date"),
                month: e.target.getAttribute("data-month"),
                year: e.target.getAttribute("data-year")
            }

            renderTask(selectedDate.year, selectedDate.month, selectedDate.date);
        }
    }

    async function renderTask(year, month, date) {
        const taskWeekday = document.getElementById("task-wday");
        const taskDate = document.getElementById("task-date");
        const getTaskWeekday = new Date(`${year}-${month}-${date}`).getDay();

        // Show weekday, date, month, year
        taskWeekday.textContent = `${weekdays[getTaskWeekday]}`;
        taskDate.textContent = `${date} ${months[month - 1]} ${year}`;

        // Show tasks
        const tasks = await getTask(year, month, date);

        let tasksContent = '';
        if (tasks.length > 0) {
            // sort task by time start
            const sortTasks = tasks.sort((a, b) => {
                const [hourA, minuteA] = a.start_time.split(":").map(Number);
                const [hourB, minuteB] = b.start_time.split(":").map(Number);

                return hourA * 60 + minuteA - (hourB * 60 + minuteB);
            });
            sortTasks.forEach((task, index) => {
                let taskColor = (index % 2 === 0) ? 'task-grey' : '';
                let finishColor = (index % 2 === 0) ? '' : 'finish-grey';
                if (task.end_time == '') {
                    taskColor = 'task-deadline';
                    tasksContent += `<div class="task ${taskColor}">
                                        <div class="task-info">
                                            <h3 class="task-name">${task.task_name}</h3>
                                            <p class="task-time">${task.start_time}</p>
                                        </div>
                                        <div class="finish finish-deadline">
                                            <span taskID = '${task.task_id}'>&#10003;</span>
                                        </div>
                                    </div>`;
                } else {
                    tasksContent += `<div class="task ${taskColor}">
                                        <div class="task-info">
                                            <h3 class="task-name">${task.task_name}</h3>
                                            <p class="task-time">${task.start_time} - ${task.end_time}</p>
                                        </div>
                                        <div class="finish ${finishColor}">
                                            <span taskID = '${task.task_id}'>&#10003;</span>
                                        </div>
                                    </div>`;
                }
            });
            getDateToAdd(year, month, date);
            todo.innerHTML = tasksContent;
            noEvent.style.display = 'none';
        } else {
            getDateToAdd(year, month, date);
            todo.innerHTML = tasksContent;
            noEvent.style.display = 'inline-block';
        }
    }

    function getTask(year, month, date) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: 'functions/getTask-process.php',
                data: { year: year, month: month, date: date },
                dataType: 'json',
                success: function (tasks) {
                    resolve(tasks);
                },
                error: function (xhr, status, error) {
                    reject(error);
                }
            });
        });

    }

    function getDates() {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: 'functions/getDate-process.php',
                data: {},
                dataType: 'json',
                success: function (tasks) {
                    resolve(tasks);
                },
                error: function (xhr, status, error) {
                    reject(error);
                }
            });
        });
    }

    function getDateToAdd(year, month, date) {
        addEvent.setAttribute("data-date", `${date}`);
        addEvent.setAttribute("data-month", `${month}`);
        addEvent.setAttribute("data-year", `${year}`);
    }

    function openAddTask(e) {
        if (e.target.tagName === 'I') {
            main.classList.add("blur-main");
            addEvent.classList.add("show-add-event");
            eventForm.reset();
            $('#task-name').removeClass('error-placeholder');
            $('#time-start').removeClass('error-placeholder');
            $('#time-end').removeClass('error-placeholder');
        }
    }

    function closeAddTask(e) {
        if (e.target.tagName === 'I') {
            main.classList.remove("blur-main");
            addEvent.classList.remove("show-add-event");
            eventForm.reset();
            resetFormError();
        }
    }

    function resetFormError() {
        document.getElementById('task-name').classList.remove('error-placeholder');
        document.getElementById('task-name').setAttribute('placeholder', 'Event name')
        document.querySelector(".startAndEnd").style.display = 'none';
        document.querySelector(".deadline-container").style.display = 'none';
        document.getElementById("label-start").classList.remove("label-error");
        document.getElementById("label-end").classList.remove("label-error");
        document.getElementById("label-deadline").classList.remove("label-error");
        timeSelectMethod.querySelector("span").textContent = 'Select method';
        timeSelectMethod.querySelector('.fa-angle-down').classList.remove('fa-angle-up');
        timeSelectMethod.classList.remove("deadline-selected");
        timeSelectMethod.classList.remove("start-end-selected");
        document.querySelector('.options-list').classList.remove("active");
        timeOptions.forEach(option => {
            option.classList.remove("start-end-selected");
            option.classList.remove("deadline-selected");
        });
    }

    // ADD TASK WITH AJAX
    async function addTask(e) {
        e.preventDefault();

        const eventName = document.getElementById("task-name");
        const selectOption = timeSelectMethod.querySelector("span");
        const timeStart = document.getElementById("time-start");
        const timeEnd = document.getElementById("time-end");
        const deadline = document.getElementById("deadlineSubmit");
        let isValid = true;
        // check event name 
        if (eventName.value.trim() === '') {
            eventName.setAttribute('placeholder', "Event name is required");
            eventName.classList.add("error-placeholder");
            isValid = false;
        }

        if (selectOption.textContent === 'Select method') {
            selectOption.classList.add("select-error");
            isValid = false;
        } else if (selectOption.textContent === 'Start-end') {
            if (timeStart.value === '') {
                timeStart.previousElementSibling.classList.add("label-error");
                isValid = false;
            }
            if (timeEnd.value === '') {
                timeEnd.previousElementSibling.classList.add("label-error");
                isValid = false;
            }
        } else if (selectOption.textContent === 'Deadline') {
            if (deadline.value === '') {
                deadline.previousElementSibling.classList.add("label-error");
                isValid = false;
            }
        }

        // add to database if no errors
        if (isValid) {
            const addTaskDate = parseInt(addEvent.getAttribute('data-date'));
            const addTaskMonth = parseInt(addEvent.getAttribute('data-month'));
            const addTaskYear = parseInt(addEvent.getAttribute('data-year'));
            const addTaskName = eventName.value.trim();
            let addStartTime;
            let addEndTime;

            if (selectOption.textContent === 'Start-end') {
                addStartTime = timeStart.value;
                addEndTime = timeEnd.value;
            } else if (selectOption.textContent === 'Deadline') {
                addStartTime = deadline.value;
                addEndTime = '';
            }

            const addTaskComplete = await ajaxAddTask(addTaskDate, addTaskMonth, addTaskYear, addTaskName, addStartTime, addEndTime);
            if (addTaskComplete) {
                renderCalendar();
                renderTask(addTaskYear, addTaskMonth, addTaskDate);
                closeAddTask({ target: closeAddEvent });
            }
        }
    }

    function ajaxAddTask(date, month, year, taskName, startTime, endTime) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: 'functions/addTask.php',
                data: {
                    date: date,
                    month: month,
                    year: year,
                    taskName: taskName,
                    startTime: startTime,
                    endTime: endTime
                },
                dataType: 'json',
                success: function (response) {

                    if (response.success) {
                        console.log("hello");
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                },
                error: function (xhr, status, error) {
                    reject(error);
                }
            });

        });
    }

    // FINISH TASK WITH AJAX
    async function finishTask(e) {
        if (e.target.tagName === 'SPAN') {
            const taskID = parseInt(e.target.getAttribute("taskID"));
            const finishTaskDate = parseInt(addEvent.getAttribute('data-date'));
            const finishTaskMonth = parseInt(addEvent.getAttribute('data-month'));
            const finishTaskYear = parseInt(addEvent.getAttribute('data-year'));

            console.log(`${finishTaskDate} - ${finishTaskMonth} - ${finishTaskYear}`);
            const isFinished = await ajaxFinishTask(taskID, finishTaskDate, finishTaskMonth, finishTaskYear);

            if (isFinished) {
                renderCalendar();
                renderTask(finishTaskYear, finishTaskMonth, finishTaskDate);
            }
        }
    }

    function ajaxFinishTask(taskID, date, month, year) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: 'functions/finishTask.php',
                data: { task_id: taskID, date: date, month: month, year: year },
                dataType: 'json',
                success: function (response) {
                    if (response.success) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                },
                error: function (xhr, status, error) {
                    reject(error);
                }
            });
        });
    }

    function openSelectTimeMethod() {
        document.querySelector('.options-list').classList.toggle("active");
        timeSelectMethod.querySelector('.fa-angle-down').classList.toggle('fa-angle-up');
    }

    function selectTimeMethod(name1, name2) {
        document.querySelector(`.${name1}`).style.display = 'flex';
        document.querySelector(`.${name2}`).style.display = 'none';

    }

    // handle time medthod option click
    timeOptions.forEach(option => {
        option.addEventListener('click', () => {
            timeOptions.forEach(option => {
                option.classList.remove("deadline-selected");
                option.classList.remove("start-end-selected");
            });

            if (option.classList.contains('start-end')) {
                option.classList.add("start-end-selected");
                selectTimeMethod('startAndEnd', 'deadline-container');
                document.getElementById("label-deadline").classList.remove("label-error");
                timeSelectMethod.classList.remove("deadline-selected");
                timeSelectMethod.classList.add("start-end-selected");

            } else if (option.classList.contains('deadline')) {
                option.classList.add("deadline-selected");
                selectTimeMethod('deadline-container', 'startAndEnd');
                document.getElementById("label-start").classList.remove("label-error");
                document.getElementById("label-end").classList.remove("label-error");
                timeSelectMethod.classList.remove("start-end-selected");
                timeSelectMethod.classList.add("deadline-selected");
            }

            document.querySelector('.options-list').classList.remove("active");
            timeSelectMethod.querySelector("span").classList.remove("select-error");
            timeSelectMethod.querySelector('.fa-angle-down').classList.remove('fa-angle-up');
            timeSelectMethod.querySelector("span").innerHTML = option.innerHTML;

        });
    });



    // time selection handle
    document.querySelectorAll('input[type="time"]').forEach(input => {
        input.addEventListener('click', (e) => {
            e.target.showPicker(); // Ensures the time picker opens
        });
    });

    timeInputs.forEach(input => {
        const label = document.querySelector(`label[for="${input.id}"]`);

        // Add focus event listener
        input.addEventListener('focus', () => {
            label.style.color = 'black'; // Change label color to red
        });

        // Add blur event listener
        input.addEventListener('blur', () => {
            if (input.value === '') {
                label.style.color = ''; // Reset label color to default
            }
        });
    });




    prev.addEventListener('click', showPrevMonth);
    next.addEventListener('click', showNextMonth);
    dates.addEventListener('click', selectionDate);
    addEventButton.addEventListener('click', openAddTask);
    timeSelectMethod.addEventListener('click', openSelectTimeMethod);
    closeAddEvent.addEventListener('click', closeAddTask);
    eventForm.addEventListener('submit', addTask);
    todo.addEventListener('click', function (e) {

        // Check if the clicked element is a span
        if (e.target.tagName.toUpperCase() === 'SPAN') {
            finishTask(e); // Call finishTask if the target is a span
        }
    });


    // default render
    renderCalendar();
    renderTask(year, month + 1, date.getDate());


});

