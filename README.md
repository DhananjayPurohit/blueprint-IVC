# Interactive Virtual Class

As the world around us stuggles to cope with the online and remote methods of work and education, we often find yourself looking at the screen and tryning to concentrate on a meeting / class.

### The problem
The problem with an online meeting / class is not being able to  delivery a fullfilling and enaging interaction with everyone. While interacting in person we are continously giving out signals via our expression and sounds as a feedback to the speaker, which is mostly missing in the online meetings. So, we can dare to say that an online class becomes analogous to an audiobook.

### Proposed solution
The solution we propose is simple and here are the steps to realize it.
1. We collect the trascript of the meeting and send it our api in realtime.
2. The api will read the text and create `fill in the blanks` and `true/false` question based on the text.
3. The questions are send to participants of the meeting via an mobile app.
4. The participants can answer the question.
5. All participants and host can view the results of the test in realtime ( while the meeting is in progress ) on a leaderboard.

### Note
The technique to create question from a text, is one of the very popular subjects of AI research. Big players like Intel and Google have made substaintial progress in this area. We are using simple ML techniques, some of the open source work and some regex to create the API.
