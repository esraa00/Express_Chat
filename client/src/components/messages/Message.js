import "./Message.css";

const Message = ({ own }) => {
  return (
    <div className={own ? "messageIsOwned message" : "message"}>
      <div className="messageTop">
        {!own && (
          <img
            src="https://via.placeholder.com/40"
            alt="userImage"
            className="messageImage"
          ></img>
        )}
        <p className={own ? "messageIsOwnedText messageText" : "messageText"}>
          loremfkdjkfjskdfjslka kdfj kjalkf j jdklaj kkdsl jkdsjaklfj kldsj
          ;fkjak jd;fjakdsjfk jsds;f lkfaj d;sf jksldj
          fjdakjfldajlkfjlkdj;fajsdkjfajkldjfkljadskljf;jdakjflksdj;fjk;;ajlk;fjkasdfihsdhfiohsadkndsnfkjsdlkfnsdndgnsihgiohoieg
          nkfd kjka ljldk fkjkdj fklaj
          lkfjklsdjalkj;kfggggggggggggggggggggggggggggggggggggggggggggggggggggggggggksfkjgkjflkdjsgklfj;gksj
          gjfdlgk; sklf jgk jslkgjkfld gkljsf; gjkfdjgks
          jkgjlksjfdgk;ljsfkdgjsk;lfdgjksdsfjgkjsfdkgj;fjgksjdfgkljsfdkgjklsfdjg;jfd
          kgj
          kdfjgkjgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
        </p>
      </div>
      <div className="messageBottom">
        <p>5:30pm</p>
      </div>
    </div>
  );
};

export default Message;
