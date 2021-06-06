import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Note from "../components/Note";

describe("#Note", () => {
  it("Comprueba que existe elemento", () => {
    render(<Note title="TePrueba" />);
    expect(screen.getByTestId("textoTitulo")).toHaveTextContent("TePrueba");
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("Comprueba contenidos iniciales", () => {
    render(<Note />);
    expect(screen.getByTestId("textoTitulo")).toHaveTextContent("Sin titulo");
  });
});
