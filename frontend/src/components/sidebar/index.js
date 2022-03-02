import NavHr from "./nav_hr";
import NavItem from "./nav_item";

export default function SideBar() {
  return (
    <div className="flex flex-col w-2/12 h-screen px-4 py-8 bg-white border-r">
      <h2 className="text-3xl font-semibold text-gray-800">NXR</h2>
      <NavHr/>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="space-y-5">
          <NavItem to="/etEducationProvider" label="Education Provider"/>
          <NavHr/>
          <NavItem to="/tgFile" label="File"/>
          <NavItem to="/upload" label="Upload File"/>
          <NavHr/>
          <NavItem to="/tgUser" label="User"/>
        </nav>
        <div className="flex items-center px-4 -mx-2">
          <img className="object-cover mx-2 rounded-full h-9 w-9"
               src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
               alt="avatar"/>
          <h4 className="mx-2 font-medium text-gray-800 hover:underline">John Doe</h4>
        </div>
      </div>
    </div>
  );
}
