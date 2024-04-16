import EyeIcon from '@/app/_imgs/eye.svg';

export default function ThemePicker() {
  return (
    <div className="dropdown dropdown-end dropdown-hover">
      <div
        role="button"
        className="btn btn-square btn-ghost">
        <EyeIcon />
        {/* <svg
          width="12px"
          height="12px"
          className="h-2 w-2 fill-current opacity-60 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg> */}
      </div>
      <ul
        className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-36">
        <li><input
          type="radio"
          name="theme-dropdown"
          className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
          aria-label="Coffee"
          value="coffee" />
        </li>
        <li><input
          type="radio"
          name="theme-dropdown"
          className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
          aria-label="Retro"
          value="retro" />
        </li>
        <li><input
          type="radio"
          name="theme-dropdown"
          className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
          aria-label="Cupcake"
          value="cupcake" />
        </li>
        <li><input
          type="radio"
          name="theme-dropdown"
          className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
          aria-label="Forest"
          value="forest" />
        </li>
        <li><input
          type="radio"
          name="theme-dropdown"
          className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
          aria-label="Business"
          value="business" />
        </li>
      </ul>
    </div>
  )
}