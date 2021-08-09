// Get date
var options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};
var today = new Date();
$(".date").text(today.toLocaleDateString("en-US", options));

var count = 0;
countTasks();

// Count the number of Tasks
function countTasks() {
  if (count === 0) {
    $(".count").addClass("no-task");
    $(".count").text("You currently have no pending tasks. Add a new task to get started!");
  } else if (count === 1) {
    $(".count").removeClass("no-task");
    $(".count").text("1 Active Task");
  } else {
    $(".count").removeClass("no-task");
    $(".count").text(count + " Active Tasks");
  }
}

// Append a new task through + button
$(".add").on("click", function() {

  if ($(".add-task-input").val() === '') {
    $(".reminder").text("Please enter in a new task!");
  } else {
    var newTask = $(".add-task-input").val();
    $(".scroll").append("<div class=\"task\" id=" + $(".task").length + "><i class=\"far fa-circle checkbox\"></i><p class=\"task-content\">" + newTask + "</p><i class=\"fas fa-trash delete\"></i></div>");
    $(".add-task-input").val('');
    $(".reminder").text('');
    count++;
    countTasks();

    // addEventListener to new task
    $(".checkbox")[$(".checkbox").length - 1].addEventListener("click", function() {
      var parentId = "#" + $(this).parent().attr('id');
      if ($(parentId).children(".checkbox").is('.fa-circle')) {
        $(parentId).children(".checkbox").removeClass("far fa-circle");
        $(parentId).children(".checkbox").addClass("fas fa-check-circle");
        $(parentId).children(".task-content").addClass("checked");
        count--;
        countTasks();

      } else if ($(parentId).children(".checkbox").is('.fa-check-circle')) {
        $(parentId).children(".checkbox").removeClass("fas fa-check-circle");
        $(parentId).children(".checkbox").addClass("far fa-circle");
        $(parentId).children(".task-content").removeClass("checked");
        count++;
        countTasks();
      }

    });
    // delete button
    $(".delete")[$(".delete").length - 1].addEventListener("click", function() {

      var parentId = "#" + $(this).parent().attr('id');
      var countOnce = false; // Avoid deleting twice
      if ($(parentId).children(".checkbox").is('.fa-check-circle')) {
        countOnce = true;
      }
      $(parentId).remove();
      if (countOnce == false) {
        count--;
        countTasks();
      }

      // reassign Id
      for (var i = 0; i < $(".task").length; i++) {
        $(".task").eq(i).attr('id', i);
      }

    });
  }




});

// Append a new task through RETURN key
$(document).on("keypress", function(event) {
  if (event.which == 13) {
    if ($(".add-task-input").val() === '') {
      $(".reminder").text("Please enter in a new task!");
    }
    else {
      var newTask = $(".add-task-input").val();
      $(".scroll").append("<div class=\"task\" id=" + $(".task").length + "><i class=\"far fa-circle checkbox\"></i><p class=\"task-content\">" + newTask + "</p><i class=\"fas fa-trash delete\"></i></div>");
      $(".add-task-input").val('');
      $(".reminder").text('');
      count++;
      countTasks();

      // addEventListener to new task
      $(".checkbox")[$(".checkbox").length - 1].addEventListener("click", function() {
        var parentId = "#" + $(this).parent().attr('id');
        if ($(parentId).children(".checkbox").is('.fa-circle')) {
          $(parentId).children(".checkbox").removeClass("far fa-circle");
          $(parentId).children(".checkbox").addClass("fas fa-check-circle");
          $(parentId).children(".task-content").addClass("checked");
          count--;
          countTasks();

        } else if ($(parentId).children(".checkbox").is('.fa-check-circle')) {
          $(parentId).children(".checkbox").removeClass("fas fa-check-circle");
          $(parentId).children(".checkbox").addClass("far fa-circle");
          $(parentId).children(".task-content").removeClass("checked");
          count++;
          countTasks();
        }

      });
      // delete button
      $(".delete")[$(".delete").length - 1].addEventListener("click", function() {

        var parentId = "#" + $(this).parent().attr('id');
        var countOnce = false; // Avoid deleting twice
        if ($(parentId).children(".checkbox").is('.fa-check-circle')) {
          countOnce = true;
        }
        $(parentId).remove();
        if (countOnce == false) {
          count--;
          countTasks();
        }

        // reassign Id
        for (var i = 0; i < $(".task").length; i++) {
          $(".task").eq(i).attr('id', i);
        }

      });
    }
  }
});

// Append a new task through + button
$(".clear-all").on("click", function() {
  $(".task").remove();
  $(".reminder").text('');
  count = 0;
  countTasks();
});
