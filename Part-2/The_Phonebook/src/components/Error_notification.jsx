const ErrorNotification = ({ error }) => {
  if (error === null) return null;

  return <div className="errorNotification">{error}</div>;
};

export default ErrorNotification;
