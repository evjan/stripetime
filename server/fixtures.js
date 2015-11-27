Moves.insert({
  title: 'Double underhooks pass',
  video_path: '/videos/Double underhooks pass.mp4'
});
Moves.insert({
  title: 'Guard recovery from toreando knee on belly',
  video_path: '/videos/Guard recovery from toreando knee on belly.mp4'
});
Moves.insert({
  title: 'Half guard to butterfly guard',
  video_path: '/videos/Half guard to butterfly guard.mp4'
});
Moves.insert({
  title: 'Half guard to closed guard',
  video_path: '/videos/Half guard to closed guard.mp4'
});
Moves.insert({
  title: 'Headquarters to near side knee through',
  video_path: '/videos/Headquarters to near side knee through.mp4'
});

var headquartersToXPassId = Moves.insert({
  title: 'Headquarters to x pass',
  video_path: '/videos/Headquarters to x pass.mp4'
});

FlashCards.insert({
  moveId: headquartersToXPassId,
  question_text: "When would you go for this pass?",
  question_video_start: 3,
  question_video_end: 8,
  answer_video_end: 16,
  answer_text: "When she's not grabbing your leg"
});
FlashCards.insert({
  moveId: headquartersToXPassId,
  question_text: "Where do you grab?",
  question_video_start: 13,
  question_video_end: 16,
  answer_video_end: 22,
  answer_text: "The lapel and the outside of the leg"
});
FlashCards.insert({
  moveId: headquartersToXPassId,
  question_text: "What do you do once you've got your grips?",
  question_video_start: 16,
  question_video_end: 23,
  answer_video_end: 31
});
FlashCards.insert({
  moveId: headquartersToXPassId,
  question_text: "What's the next step?",
  question_video_start: 22,
  question_video_end: 31,
  answer_video_end: 36
});

Moves.insert({
  title: 'Knee through pass from headquarters',
  video_path: '/videos/Knee through pass from headquarters.mp4'
});
Moves.insert({
  title: 'Making posture and dealing with grips in closed guard',
  video_path: '/videos/Making posture and dealing with grips in closed guard.mp4'
});
Moves.insert({
  title: 'Recovery from over under',
  video_path: '/videos/Recovery from over under.mp4'
});
Moves.insert({
  title: 'Submissions from closed guard',
  video_path: '/videos/Submissions from closed guard.mp4'
});
Moves.insert({
  title: 'Toreando pass to knee on belly',
  video_path: '/videos/Toreando pass to knee on belly.mp4'
});
Moves.insert({
  title: 'Toreando pass with shoulder pressure',
  video_path: '/videos/Toreando pass with shoulder pressure.mp4'
});

if (FlashCards.find().count() === 0) {
  // FlashCards.insert({
  //   move_name: "Toreando pass to knee on belly",
  //   video_path: "/videos/Toreando pass to knee on belly.mp4",
  //   question_text: "How do you begin the pass?",
  //   question_video_start: 5,
  //   question_video_end: 7,
  //   answer_video_end: 12
  // });
  // FlashCards.insert({
  //   move_name: "Toreando pass to knee on belly",
  //   video_path: "/videos/Toreando pass to knee on belly.mp4",
  //   question_text: "What do you do when you get blocked?",
  //   question_video_start: 7,
  //   question_video_end: 13,
  //   answer_video_end: 21
  // });
  // FlashCards.insert({
  //   move_name: "Toreando pass to knee on belly",
  //   video_path: "/videos/Toreando pass to knee on belly.mp4",
  //   question_text: "What do you do once you have the knee on belly?",
  //   question_video_start: 16,
  //   question_video_end: 21,
  //   answer_video_end: 26,
  //   answer_text: "Stabilise and keep the other leg out so she can't grab it"
  // });

}
