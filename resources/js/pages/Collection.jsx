import React, {useContext, useEffect, useState} from 'react'
import {ShopContext} from '../context/ShopContext'
import {assets} from "../assets/assets"
import ProductItem from '../components/ProductItem'
import Title from '../components/Title'
import AppLayout from "@/Layouts/AppLayout.jsx";
import ProductService from "@/services/ProductService";
import Pagination from "@/components/Pagination";
import {Head, usePage} from "@inertiajs/react";

const Collection = () => {
  const {products} = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(true)
  const [filterProducts, setFilterProducts] = useState([])
  const [apiProductCollection, setApiProductCollection] = useState([]);
  const [paginationMeta, setPaginationMeta] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [category, setCategory] = useState('');
  const [selectedMasterCategory, setSelectedMasterCategory] = useState(null);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [isLoadingSubCategories, setIsLoadingSubCategories] = useState(false);
  const [subCategorySearchTerm, setSubCategorySearchTerm] = useState('');
  const [showAllSubCategories, setShowAllSubCategories] = useState(false);
  const [color, setColor] = useState([])
  const [sortType, setSortType] = useState('relavent')

  const genders = usePage().props.genders;
  const allColorsFromProps = usePage().props.colors.data;
  const masterCategories = usePage().props.masterCategories.data;

  const [colorSearchTerm, setColorSearchTerm] = useState('');
  const [showAllColors, setShowAllColors] = useState(false);

  const [articleTypeOptions, setArticleTypeOptions] = useState([]);
  const [selectedArticleTypeId, setSelectedArticleTypeId] = useState(null);
  const [isLoadingArticleTypes, setIsLoadingArticleTypes] = useState(false);
  const [articleTypeSearchTerm, setArticleTypeSearchTerm] = useState('');
  const [showAllArticleTypes, setShowAllArticleTypes] = useState(false);

  useEffect(() => {
    setFilterProducts(products)
  }, [products])

  useEffect(() => {
    if (selectedMasterCategory) {
      setIsLoadingSubCategories(true);
      setSelectedSubCategoryId(null);
      setSubCategorySearchTerm('');
      setShowAllSubCategories(false);
      setArticleTypeOptions([]);
      setSelectedArticleTypeId(null);
      ProductService.fetchSubCategories(selectedMasterCategory)
        .then(response => {
          setSubCategoryOptions(response.data || []);
        })
        .catch(error => {
          console.error("Error fetching subcategories:", error);
          setSubCategoryOptions([]);
        })
        .finally(() => {
          setIsLoadingSubCategories(false);
        });
    } else {
      setSubCategoryOptions([]);
      setSelectedSubCategoryId(null);
      setSubCategorySearchTerm('');
      setArticleTypeOptions([]);
      setSelectedArticleTypeId(null);
    }
  }, [selectedMasterCategory]);

  useEffect(() => {
    if (selectedSubCategoryId) {
      setIsLoadingArticleTypes(true);
      setSelectedArticleTypeId(null);
      setArticleTypeSearchTerm('');
      setShowAllArticleTypes(false);
      ProductService.fetchArticleTypes(selectedSubCategoryId)
        .then(response => {
          setArticleTypeOptions(response.data || []);
        })
        .catch(error => {
          console.error("Error fetching article types:", error);
          setArticleTypeOptions([]);
        })
        .finally(() => {
          setIsLoadingArticleTypes(false);
        });
    } else {
      setArticleTypeOptions([]);
      setSelectedArticleTypeId(null);
      setArticleTypeSearchTerm('');
    }
  }, [selectedSubCategoryId]);

  useEffect(() => {
    const genderFilter = category ? category : null;
    const masterCategoryFilter = selectedMasterCategory ? parseInt(selectedMasterCategory, 10) : null;
    const subCategoryFilter = selectedSubCategoryId ? parseInt(selectedSubCategoryId, 10) : null;
    const articleTypeFilter = selectedArticleTypeId ? parseInt(selectedArticleTypeId, 10) : null;

    ProductService.fetchProducts(currentPage, 20, genderFilter, color, masterCategoryFilter, subCategoryFilter, articleTypeFilter)
      .then(response => {
        setApiProductCollection(response.data);
        setPaginationMeta(response.meta);
        console.log(`Fetched products with gender: ${genderFilter}, colors: [${color.join(', ')}], masterCat: ${masterCategoryFilter}, subCat: ${subCategoryFilter}, articleType: ${articleTypeFilter}`, response.data);
        console.log("Pagination meta:", response.meta);
      })
      .catch(error => {
        console.error("Failed to fetch products from API for Collection page:", error);
        setApiProductCollection([]);
        setPaginationMeta(null);
      });
  }, [currentPage, category, color, selectedMasterCategory, selectedSubCategoryId, selectedArticleTypeId]);

  const handleFilterChange = (value, filterType) => {
    switch (filterType) {
      case 'category':
        setCategory(prev => prev === value ? '' : value);
        break;
      case 'masterCategory':
        setSelectedMasterCategory(prev => prev === value ? null : value);
        break;
      case 'subCategory':
        setSelectedSubCategoryId(prev => prev === value ? null : value);
        break;
      case 'articleType':
        setSelectedArticleTypeId(prev => prev === value ? null : value);
        break;
      case 'color':
        const colorObject = allColorsFromProps.find(c => c.name === value);
        if (colorObject) {
          const colorId = colorObject.id;
          setColor(prevSelectedColorIds =>
            prevSelectedColorIds.includes(colorId)
              ? prevSelectedColorIds.filter(id => id !== colorId)
              : [...prevSelectedColorIds, colorId]
          );
        }
        break;
      default:
        break;
    }
  };

  const applyFilter = () => {
    let filtered = products.slice()

    if (category) {
      filtered = filtered.filter(item => item.category === category)
    }
    if (selectedMasterCategory) {
      // Assuming product item has a `masterCategoryId` field or similar for local filtering.
      // This part needs to be adjusted based on your context `products` structure.
      // Example: filtered = filtered.filter(item => item.masterCategoryId === parseInt(selectedMasterCategory, 10));
    }
    if (selectedSubCategoryId) {
      // Logic for local filtering by selected subcategory ID
      // Example: filtered = filtered.filter(item => item.subCategoryId === parseInt(selectedSubCategoryId, 10));
    }
    if (selectedArticleTypeId) {
      // Logic for local filtering by selected article type ID
      // Example: filtered = filtered.filter(item => item.articleTypeId === parseInt(selectedArticleTypeId, 10));
    }
    if (color.length > 0) {
      // This local filter needs to map product color names/IDs to the selected IDs.
      // Assuming product item has a `baseColourId` or similar that matches the color IDs.
      // For demonstration, let's assume product.colorId exists.
      // Or, if product.baseColour is a name, we'd need to find its ID from allColorsFromProps.
      // THIS PART OF `applyFilter` MIGHT NEED ADJUSTMENT BASED ON YOUR `products` (from context) STRUCTURE.
      // For now, I'll comment it out to avoid breaking it, as its logic is complex without knowing product structure.
      // filtered = filtered.filter(item => color.includes(item.colorId)); // Example if item has colorId
    }

    switch (sortType) {
      case 'low-high':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'high-low':
        filtered.sort((a, b) => b.price - a.price)
        break
      default:
        break
    }

    setFilterProducts(filtered)
  }

  useEffect(() => {
    applyFilter()
  }, [category, selectedMasterCategory, color, sortType, products]);

  const handlePageChange = (newPage) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AppLayout>
      <Head title='Collection'/>

      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

        {/* Filter Sidebar */}
        <div className='min-w-60'>
          <p
            className='my-2 text-xl flex items-center cursor-pointer gap-2'
            onClick={() => setShowFilter(!showFilter)}
          >
            <img className='h-3 sm:hidden rotate-90' src={assets.dropdown_icon}/>
            FILTERS
          </p>

          {/* Gender Filter (Previously Category) */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
             <div className='flex justify-between items-center mb-3'>
                <p className='text-sm font-medium'>Gender</p>
                {category && ( // Show clear button only if a gender is selected
                    <button
                        onClick={() => setCategory('')}
                        className='text-xs text-blue-600 hover:text-blue-800 font-medium mr-2'
                    >
                        Clear
                    </button>
                )}
             </div>
              <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
               {genders.map((genderValue, index) => (
                  <label key={index} className='flex gap-2 items-center'>
                    <input
                      className='w-3 h-3'
                      type='radio'
                      name='gender'
                      value={genderValue}
                      checked={category === genderValue}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    {genderValue}
                  </label>
                ))}
              </div>
          </div>

          {/* MasterCategory Filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <div className='flex justify-between items-center mb-3'>
                <p className='text-sm font-medium'>MASTER CATEGORY</p>
                {selectedMasterCategory && (
                    <button
                        onClick={() => setSelectedMasterCategory(null)}
                        className='text-xs text-blue-600 hover:text-blue-800 font-medium mr-2'
                    >
                        Clear
                    </button>
                )}
            </div>
             <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                {masterCategories.map((mc) => (
                  <label key={mc.id} className='flex gap-2 items-center'>
                    <input
                      className='w-3 h-3'
                      type='radio'
                      name='masterCategory'
                      value={mc.id.toString()}
                      checked={selectedMasterCategory === mc.id.toString()}
                      onChange={(e) => handleFilterChange(e.target.value, 'masterCategory')}
                    />
                    {mc.name}
                  </label>
                ))}
              </div>
          </div>

          {/* SubCategory Filter - Conditional */}
          {selectedMasterCategory && (
            <div className={`border border-gray-300 px-5 py-3 mt-3 ${showFilter ? '' : 'hidden'} sm:block`}>
              <div className='flex justify-between items-center mb-3'>
                <p className='text-sm font-medium'>SUB CATEGORY</p>
                {selectedSubCategoryId && (
                    <button
                        onClick={() => setSelectedSubCategoryId(null)}
                        className='text-xs text-blue-600 hover:text-blue-800 font-medium mr-2'
                    >
                        Clear
                    </button>
                )}
              </div>
              <input
                type="text"
                placeholder="Search subcategories..."
                className="w-full p-2 border border-gray-300 rounded-md mb-3 text-sm"
                value={subCategorySearchTerm}
                onChange={(e) => setSubCategorySearchTerm(e.target.value)}
              />
              {isLoadingSubCategories && <p className="text-sm text-gray-500">Loading subcategories...</p>}
              {!isLoadingSubCategories && subCategoryOptions.length === 0 && <p className="text-sm text-gray-500">No subcategories found for the selected master category.</p>}
              {!isLoadingSubCategories && subCategoryOptions.length > 0 && (
                <>
                  <div className='flex flex-col gap-2 text-sm font-light text-gray-700 max-h-60 overflow-y-auto'>
                    {subCategoryOptions
                      .filter(sc => sc.name && sc.name.toLowerCase().includes(subCategorySearchTerm.toLowerCase()))
                      .slice(0, showAllSubCategories ? subCategoryOptions.length : 10)
                      .map((sc) => (
                      <label key={sc.id} className='flex gap-2 items-center'>
                        <input
                          className='w-3 h-3'
                          type='radio'
                          name='subCategory' // Group radio buttons
                          value={sc.id.toString()} // Value is ID for handler
                          checked={selectedSubCategoryId === sc.id.toString()}
                          onChange={(e) => handleFilterChange(e.target.value, 'subCategory')}
                        />
                        {sc.name}
                      </label>
                    ))}
                  </div>
                  {subCategoryOptions.filter(sc => sc.name && sc.name.toLowerCase().includes(subCategorySearchTerm.toLowerCase())).length > 10 && (
                    <button
                      onClick={() => setShowAllSubCategories(!showAllSubCategories)}
                      className="text-sm text-blue-600 hover:text-blue-800 mt-2"
                    >
                      {showAllSubCategories ? 'Show Less' : 'Show More'}
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {/* ArticleType Filter - Conditional */}
          {selectedSubCategoryId && (
            <div className={`border border-gray-300 px-5 py-3 mt-3 ${showFilter ? '' : 'hidden'} sm:block`}>
                <div className='flex justify-between items-center mb-3'>
                    <p className='text-sm font-medium'>ARTICLE TYPE</p>
                    {selectedArticleTypeId && (
                        <button 
                            onClick={() => setSelectedArticleTypeId(null)} 
                            className='text-xs text-blue-600 hover:text-blue-800 font-medium mr-2'
                        >
                            Clear
                        </button>
                    )}
                </div>
                <input 
                    type="text"
                    placeholder="Search article types..."
                    className="w-full p-2 border border-gray-300 rounded-md mb-3 text-sm"
                    value={articleTypeSearchTerm}
                    onChange={(e) => setArticleTypeSearchTerm(e.target.value)}
                />
                {isLoadingArticleTypes && <p className="text-sm text-gray-500">Loading article types...</p>}
                {!isLoadingArticleTypes && articleTypeOptions.length === 0 && <p className="text-sm text-gray-500">No article types found for the selected subcategory.</p>}
                {!isLoadingArticleTypes && articleTypeOptions.length > 0 && (
                    <>
                        <div className='flex flex-col gap-2 text-sm font-light text-gray-700 max-h-60 overflow-y-auto'>
                        {articleTypeOptions
                            .filter(at => at.name && at.name.toLowerCase().includes(articleTypeSearchTerm.toLowerCase()))
                            .slice(0, showAllArticleTypes ? articleTypeOptions.length : 10)
                            .map((at) => (
                            <label key={at.id} className='flex gap-2 items-center'>
                                <input 
                                className='w-3 h-3' 
                                type='radio' 
                                name='articleType' // Group radio buttons
                                value={at.id.toString()} 
                                checked={selectedArticleTypeId === at.id.toString()}
                                onChange={(e) => handleFilterChange(e.target.value, 'articleType')}
                                />
                                {at.name}
                            </label>
                            ))}
                        </div>
                        {articleTypeOptions.filter(at => at.name && at.name.toLowerCase().includes(articleTypeSearchTerm.toLowerCase())).length > 10 && (
                        <button 
                            onClick={() => setShowAllArticleTypes(!showAllArticleTypes)}
                            className="text-sm text-blue-600 hover:text-blue-800 mt-2"
                        >
                            {showAllArticleTypes ? 'Show Less' : 'Show More'}
                        </button>
                        )}
                    </>
                )}
            </div>
          )}

          {/* Color Filter */}
          <div className={`border border-gray-300 px-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>COLOR</p>
            <input
              type="text"
              placeholder="Search colors..."
              className="w-full p-2 border border-gray-300 rounded-md mb-3 text-sm"
              value={colorSearchTerm}
              onChange={(e) => setColorSearchTerm(e.target.value)}
            />
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700 max-h-60 overflow-y-auto'>
              {allColorsFromProps
                .filter(colorObj => colorObj.name && colorObj.name.toLowerCase().includes(colorSearchTerm.toLowerCase()))
                .slice(0, showAllColors ? allColorsFromProps.length : 10)
                .map((colorObj, index) => (
                <label key={colorObj.id || index} className='flex gap-2 items-center'>
                  <input
                      className='w-3 h-3'
                      type='checkbox'
                      value={colorObj.name}
                      checked={color.includes(colorObj.id)}
                      onChange={(e) => handleFilterChange(e.target.value, 'color')}
                  />
                  {colorObj.name}
                </label>
              ))}
            </div>
            {allColorsFromProps.filter(colorObj => colorObj.name && colorObj.name.toLowerCase().includes(colorSearchTerm.toLowerCase())).length > 10 && (
              <button
                onClick={() => setShowAllColors(!showAllColors)}
                className="text-sm text-blue-600 hover:text-blue-800 mt-2"
              >
                {showAllColors ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>

          {/* Style Filter (Statik) */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>STYLE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              {['Street', 'Minimal', 'Edgy', 'Casual', 'Sporty', 'Bold'].map((value, index) => (
                <label key={index} className='flex gap-2'>
                  <input className='w-3' type='checkbox' disabled/>
                  {value}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title text1='ALL' text2='COLLECTIONS'/>
            <select
              className='border-2 border-gray-300 text-sm px-2'
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value='relavent'>Sort by: Relevance</option>
              <option value='low-high'>Sort by: Low to High</option>
              <option value='high-low'>Sort by: High to Low</option>
            </select>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6'>
            {apiProductCollection.map((item, index) => (
              <ProductItem
                key={item.id || index}
                product={item}
              />
            ))}
          </div>
          {paginationMeta && paginationMeta.links && (
            <Pagination meta={paginationMeta} onPageChange={handlePageChange} />
          )}
        </div>
      </div>
    </AppLayout>
  )
}

export default Collection;
