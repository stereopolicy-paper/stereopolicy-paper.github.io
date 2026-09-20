$(document).ready(function() {
    $(".fragility-frame").on("mouseenter mousemove", function(event) {
      var rect = this.getBoundingClientRect();
      var x = ((event.clientX - rect.left) / rect.width) * 100;
      var y = ((event.clientY - rect.top) / rect.height) * 100;

      x = Math.max(0, Math.min(100, x));
      y = Math.max(0, Math.min(100, y));

      this.style.setProperty("--zoom-x", x + "%");
      this.style.setProperty("--zoom-y", y + "%");
      var noteX = Math.max(8, Math.min(62, x));
      var noteY = Math.max(18, Math.min(92, y));

      this.style.setProperty("--note-x", noteX + "%");
      this.style.setProperty("--note-y", noteY + "%");
      this.classList.add("is-zooming");
      $(this).closest(".fragility-item").addClass("is-zooming");
    });

    $(".fragility-frame").on("mouseleave", function() {
      this.classList.remove("is-zooming");
      $(this).closest(".fragility-item").removeClass("is-zooming");
      this.style.setProperty("--zoom-x", "50%");
      this.style.setProperty("--zoom-y", "50%");
      this.style.setProperty("--note-x", "0.75rem");
      this.style.setProperty("--note-y", "calc(100% - 0.75rem)");
    });



	    function activateTabletopTask(taskId) {
	      var $selectedButton = $('.task-selector-button[data-task="' + taskId + '"]');
	      var $selectedPanel = $('.tabletop-task-panel[data-task-panel="' + taskId + '"]');

	      if (!$selectedButton.length || !$selectedPanel.length) {
	        return;
	      }

	      $(".task-selector-button").removeClass("is-active").attr("aria-selected", "false");
	      $selectedButton.addClass("is-active").attr("aria-selected", "true");

	      $(".tabletop-task-panel").each(function() {
	        var isSelected = this === $selectedPanel[0];
	        $(this).toggleClass("is-active", isSelected).prop("hidden", !isSelected);

	        $(this).find("video").each(function() {
	          if (isSelected) {
	            var playPromise = this.play();
	            if (playPromise && typeof playPromise.catch === "function") {
	              playPromise.catch(function() {});
	            }
	          } else {
	            this.pause();
	          }
	        });
	      });
	    }

	    $(".task-selector-button").on("click", function() {
	      activateTabletopTask(this.getAttribute("data-task"));
	    });

	    $(".task-selector-button").on("keydown", function(event) {
	      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
	        return;
	      }

	      event.preventDefault();
	      var buttons = $(".task-selector-button").toArray();
	      var currentIndex = buttons.indexOf(this);
	      var direction = event.key === "ArrowRight" ? 1 : -1;
	      var nextButton = buttons[(currentIndex + direction + buttons.length) % buttons.length];
	      nextButton.focus();
	      activateTabletopTask(nextButton.getAttribute("data-task"));
	    });

	    activateTabletopTask($(".task-selector-button.is-active").attr("data-task"));

	    var singleTaskVideo = document.getElementById("single-task-result-video");
    var multiTaskVideo = document.getElementById("multi-task-result-video");
    if (singleTaskVideo) {
      singleTaskVideo.playbackRate = 2.0;
    }
    if (multiTaskVideo) {
      multiTaskVideo.playbackRate = 2.0;
    }

})
