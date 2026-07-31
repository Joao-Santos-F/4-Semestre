import Swal from "sweetalert2";
import "./Alerta.css";

const Alerta = ({
    title,
    text,
    icon,
    showCancelButton = null,
    confirmButtonColor = "#3085d6",
    cancelButtonColor = "#d33",
    confirmButtonText = null,
    cancelButtonText = null,
    input = null,
    inputPlaceholder = null,
}) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: showCancelButton,
    confirmButtonColor: confirmButtonColor,
    cancelButtonColor: cancelButtonColor,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    input: input,
    inputPlaceholder: inputPlaceholder,
  });
};

export default Alerta;