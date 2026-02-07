const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex border border-white/20 rounded-sm overflow-hidden">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`flex-1 py-2 font-bold transition bodyText
            ${
              activeTab === tab.value
                ? "bg-amber-500 text-black"
                : "text-white/60 hover:text-white"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
