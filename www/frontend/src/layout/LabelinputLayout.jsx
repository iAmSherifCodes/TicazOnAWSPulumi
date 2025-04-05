import React from "react";
import styled from "styled-components";

function LabelinputLayout({
  label,
  placeholder,
  onChange,
  style,
  inputstyle,
  disabled,
  value,
  type,
  fontSize
}) {
  return (
    <LabelLayout >
      <div className="labels" style={style}>
        <label style={{
          fontSize:fontSize
        }}>{label}</label>
        <input
        required
          value={value}
          type={type ? type : "text"}
          disabled={disabled}
          style={inputstyle}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </LabelLayout>
  );
}

export default LabelinputLayout;
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

  .labels input {
    color: #2b2d31;
    outline: none;
    line-height: 24px;
    font-size: 14px;
    font-weight: 400;
    background-color: white;
    padding: 15px;
    height: 45px;
    border: 1px solid #d0d5dd;
    border-radius: 5px;
  }
`;
