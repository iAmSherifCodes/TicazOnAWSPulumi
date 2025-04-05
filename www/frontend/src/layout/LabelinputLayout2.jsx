import React from "react";
import styled from "styled-components";

function LabelinputLayout2({
  label,
  placeholder,
  onChange,
  style,
  inputstyle,
  disabled,
  value,
  type
}) {
  return (
    <LabelLayout>
      <div className="labels" style={style}>
        <label>{label}</label>
        <textarea
          value={value}
          type={type ? type : "text"}
          disabled={disabled}
          style={inputstyle}
          placeholder={placeholder}
          onChange={onChange}
        ></textarea>
      </div>
    </LabelLayout>
  );
}

export default LabelinputLayout2;
const LabelLayout = styled.div`
  .labels {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-top: 10px;
  }

  .labels label {
    color: #344054;
    line-height: 20px;
    font-size: 13px;
    font-weight: 500;
  }

  .labels ::placeholder {
    color: #667085;
    line-height: 24px;
    font-size: 14px;
    font-weight: 400;
  }

  .labels textarea {
    color: #2b2d31;
    outline: none;
    line-height: 24px;
    font-size: 14px;
    font-weight: 400;
    background-color: white;
    padding: 5px;
    border: 1px solid #d0d5dd;
    border-radius: 5px;
  }
`;
