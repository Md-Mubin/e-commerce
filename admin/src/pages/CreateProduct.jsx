import React, { useState } from 'react'

const CreateProduct = () => {

    const InputField = ({ label, id, type = 'text', placeholder, value, onChange, className = '' }) => (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type={type}
                id={id}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );

    const SelectField = ({ label, id, options, value, onChange, className = '' }) => (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <select
                id={id}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                value={value}
                onChange={onChange}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
    const Tag = ({ text, onRemove }) => (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mr-2 mb-2">
            {text}
            <button
                type="button"
                onClick={onRemove}
                className="ml-2 -mr-0.5 h-4 w-4 flex items-center justify-center rounded-full text-indigo-600 hover:bg-indigo-200 focus:outline-none focus:bg-indigo-200"
            >
                <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </span>
    );

    // Thumbnail Upload Component
    const ThumbnailUpload = ({ fileName, status, onRemove }) => (
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md mb-2">
            <div className="flex items-center">
                {/* Placeholder for image thumbnail */}
                <img
                    src={`https://placehold.co/40x40/E0F2F7/000000?text=Thumb`}
                    alt="Thumbnail"
                    className="w-10 h-10 rounded-md object-cover mr-3"
                />
                <span className="text-sm text-gray-700">{fileName}</span>
            </div>
            <div className="flex items-center">
                {status === 'uploaded' && (
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                )}
                {status === 'pending' && (
                    <svg className="h-5 w-5 text-yellow-500 animate-spin mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="3"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                <button
                    type="button"
                    onClick={onRemove}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );

const [productName, setProductName] = useState('Smartwatch');
  const [description, setDescription] = useState('This is a description of the product.');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [sku, setSku] = useState('FOX-2993');
  const [stockQuantity, setStockQuantity] = useState('1258');
  const [regularPrice, setRegularPrice] = useState('550');
  const [salePrice, setSalePrice] = useState('450');
  const [taxStatus, setTaxStatus] = useState('taxable');
  const [taxClass, setTaxClass] = useState('standard');
  const [tags, setTags] = useState(['smartwatch', 'Apple', 'watch', 'smartphone', 'iPhone13 max']);
  const [productThumbnails, setProductThumbnails] = useState([
    { id: 1, name: 'Product_thumbnail_1.png', status: 'uploaded' },
    { id: 2, name: 'Product_thumbnail_2.png', status: 'uploaded' },
    { id: 3, name: 'Product_thumbnail_3.png', status: 'uploaded' },
    { id: 4, name: 'Product_thumbnail_4.png', status: 'uploaded' },
    { id: 5, name: 'Product_thumbnail_5.png', status: 'uploaded' },
  ]);

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleRemoveThumbnail = (idToRemove) => {
    setProductThumbnails(productThumbnails.filter((thumb) => thumb.id !== idToRemove));
  };


    return (
        <>

        </>
    )
}

export default CreateProduct