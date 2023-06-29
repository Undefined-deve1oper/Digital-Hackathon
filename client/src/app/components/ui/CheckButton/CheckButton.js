import React from "react";

function CheckButton({ checked, handleCheck }) {

    return (
        <div
            animate={checked ? "checked" : "unchecked"}
            onClick={() => handleCheck()}
        >

        </div>
    );
}

export default CheckButton;
