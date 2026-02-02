import "./CustomCheckbox.scss"

type Props = {
  title: string;
}

export default function CustomCheckbox({title}: Props) {
  return (
    <label className="container">
      <input type="checkbox" />
      <span className="checkmark"></span>
      {title}
    </label>
  )
}
