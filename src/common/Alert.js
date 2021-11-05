import React from "react";

function Alert({type="danger", messages=[]}) {
    return (
        <div className={`Alert Alert-${type}`} role="alert">
            {messages.map(error => (
            <p className="Alert-message" key={error}>
              {error}
            </p>
        ))}
        </div>
    );
}

export default Alert;