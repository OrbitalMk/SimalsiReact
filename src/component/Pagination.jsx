import React from 'react';

const PageLink = ({ active, label, url, setpage }) => {
  //'bg-white': active
  // mt-1 mb-1 w-8 h-8 flex justify-center items-center
  return (
    <button
        className={`${active && "bg-violet-700 text-white"} mr-1 mb-1 px-4 py-3 border border-transparent hover:border-violet-300 rounded text-sm`}
        onClick={() => setpage(url)}
        >
      <span dangerouslySetInnerHTML={{ __html: label }}></span>
    </button>
  );
};

// Previous, if on first page
// Next, if on last page
// and dots, if exists (...)
const PageInactive = ({ label }) => {
  return (
    <div
        className='mr-1 mb-1 px-4 py-3 text-sm border rounded border-none border-gray-300 text-gray-400 cursor-default'
        dangerouslySetInnerHTML={{ __html: label }}
    />
  );
};

export default ({ links = [], setpage }) => {
  // dont render, if there's only 1 page (previous, 1, next)
  if (links.length === 3) return null;
  return (
    <div className="flex flex-wrap mt-6 -mb-1 justify-center">
      {links.map(({ active, label, url }) => {
        return url === null ? (
          <PageInactive key={label} label={label} />
        ) : (
          <PageLink key={label} label={label} active={active} url={url} setpage={setpage} />
        );
      })}
    </div>
  );
};