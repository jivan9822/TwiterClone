import DisplayReplyHelper from './DisplayReplyHelper';

const DisplayReplies = ({ replies }) => {
  return (
    <div>
      {replies.map((reply) => {
        return <DisplayReplyHelper key={reply._id} reply={reply} />;
      })}
    </div>
  );
};
export default DisplayReplies;
