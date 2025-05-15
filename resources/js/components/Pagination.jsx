import React from 'react';

const PaginationLink = ({ link, onPageChange }) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (link.url) {
      try {
        const url = new URL(link.url);
        const page = url.searchParams.get('page');
        if (page) {
          onPageChange(parseInt(page, 10));
        }
      } catch (error) {
        console.error("Error parsing pagination URL:", error);
      }
    }
  };

  let label = link.label;
  if (label.includes('&laquo;')) {
    label = '« Previous';
  } else if (label.includes('&raquo;')) {
    label = 'Next »';
  }

  const commonClasses = "px-3 py-2 leading-tight";
  const activeClasses = "text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700";
  const defaultClasses = "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700";
  const disabledClasses = "text-gray-400 bg-gray-100 border border-gray-300 cursor-not-allowed";

  let itemClasses = link.active ? activeClasses : defaultClasses;
  if (!link.url || label === '...') {
    itemClasses = disabledClasses;
  }

  // Special handling for first and last page rounded corners
  let roundedClass = '';
  if (label === '« Previous') {
    roundedClass = 'rounded-l-lg';
  } else if (label === 'Next »') {
    roundedClass = 'rounded-r-lg';
  }


  return (
    <li>
      <a
        href={link.url || '#'}
        onClick={(!link.url || label === '...') ? (e) => e.preventDefault() : handleClick}
        className={`${commonClasses} ${itemClasses} ${roundedClass}`}
        aria-current={link.active ? 'page' : undefined}
        dangerouslySetInnerHTML={{ __html: link.label }} // Using label directly for HTML entities
      />
    </li>
  );
};

const Pagination = ({ meta, onPageChange }) => {
  if (!meta || !meta.links || meta.links.length === 0) {
    return null;
  }

  // Filter out the "..." links that don't have a URL, as they are not clickable.
  // The original "..." link from Laravel often has a null URL.
  const pageLinks = meta.links;

  return (
    <nav aria-label="Page navigation" className="mt-8 flex justify-center">
      <ul className="inline-flex -space-x-px text-sm">
        {pageLinks.map((link, index) => (
          <PaginationLink key={index} link={link} onPageChange={onPageChange} />
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
