import {useState} from 'react';
import {NavItem, NavLink, TabContent, TabPane, Nav as NavStrap} from "reactstrap";
import classnames from "classnames";

export default function Nav({tabs, defaultTab}) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <>
      <NavStrap tabs>
        {tabs.map(tab => (
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === tab.id })}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </NavLink>
          </NavItem>
        ))}
      </NavStrap>
      <TabContent activeTab={activeTab}>
        {tabs.map(tab => (
          <TabPane tabId={tab.id}>
            {tab.content}
          </TabPane>
        ))}
      </TabContent>
    </>
  )
}

