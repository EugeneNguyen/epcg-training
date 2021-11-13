import {useState} from 'react';

export default function Nav({tabs, defaultTab}) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <>
      <nav class="bg-white shadow dark:bg-gray-800">
        <div class="container flex items-center justify-center p-3 mx-auto text-gray-600 capitalize dark:text-gray-300">
          {tabs.map(tab => activeTab === tab.id ? (
            <a
              onClick={() => setActiveTab(tab.id)}
              class="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6"
            >
              {tab.label}
            </a>
          ) : (
            <a
              onClick={() => setActiveTab(tab.id)}
              class="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
            >
              {tab.label}
            </a>
          ))}
        </div>
      </nav>
      <div>
        {tabs.find(tab => tab.id === activeTab).content}
      </div>
    </>
  );
}

