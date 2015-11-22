if (FlashCards.find().count() === 0) {
  FlashCards.insert({
    move_name: "Double underhooks pass",
    video_path: "/videos/Double underhooks pass.mp4",
    question_text: "How do you begin the pass?",
    question_video_start: 10,
    question_video_end: 13,
    answer_text: "Like this",
    answer_video_end: 17
  });
}
