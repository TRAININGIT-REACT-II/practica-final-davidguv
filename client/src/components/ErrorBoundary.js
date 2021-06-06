import React from "react";
import Mensaje from "./Mensaje";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = {
      error: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      error: true,
    };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  /**
   * Llama al método onReset que recibe por las propiedades y reinicia el error
   */
  onClick() {
    this.props.onReset();
    this.setState({error: false});
  }

  render() {
    // Si ha habido un error, mostramos el mensaje y un botón para reiniciar el estado
    if (this.state.error === true) {
      return (
        <Mensaje
          open={true}
          title={"Error en la aplicación"}
          content={"Se ha encontrado un error en la aplicación"}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
