import React, { ReactElement } from "react";
import { Button, Container } from "semantic-ui-react";

import "./Input.css";

interface Props {}

export default function Input({}: Props): ReactElement {
  const textAreaPlaceholder: string = "waguan \nslimes";
  return (
    <div className="flexStartVertically">
      <div className="flexAroundHorizontally">
        <textarea placeholder={textAreaPlaceholder} />
      </div>
      <div className = "flexAroundHorizontally buttonContainer">
        <Button color="teal">Calculate</Button>
      </div>
    </div>
  );
}
