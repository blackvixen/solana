import useListenForOutsideClicks from '@/hooks/useListenForOutsideClicks'
import { FC, useMemo, useState } from 'react'
import { FaChevronDown } from "react-icons/fa";

const Select: FC<SelectProps> = ({ options, isSearchable, setSearchInput, searchInput, selected = { id: 'usd-coin', symbol: "usdc", name: "USDC", mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" }, placeholder = 'Search Token', handleSelect }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const openDropdown = () => {
        setIsDropdownOpen(true)
    }

    const closeDropdown = () => {
        setIsDropdownOpen(false)
    }

    const labelClassName = () => {
        return `block w-[120px] text-base font-bold uppercase truncate ${selected?.symbol ? 'dark:text-white' : 'text-gray-400 dark:text-gray-700'}`
    }

    const optionClassName = (option: SelectOptionProps, index: number, isSelected: boolean) => {
        isSelected ||= selected?.symbol === option.symbol

        return `active:bg-background-selected-option relative cursor-default select-none py-2 px-4 ${options.length - 1 === index ? 'rounded-b-md' : ''
            } ${isSelected ? 'bg-light/10 bg-blur dark:bg-dark/10' : ''} hover:bg-light/10 bg-blur dark:hover:bg-dark/10 block text-left w-full`
    }

    const containerClassName = () => `
    ${isDropdownOpen ? '!border-gray-200 !dark:border-white border-2' : ''
        } px-4 py-2 flex justify-between items-center rounded-lg !w-[120px] font-normal border-2 bg-white dark:bg-gray-700 leading-[20px] text-base text-gray-900 dark:text-gray-200
    `

    const { elementRef } = useListenForOutsideClicks(closeDropdown)

    const filteredOptions = useMemo(() => {
        return options.filter(option =>
            option.id.toLowerCase().includes(searchInput!.toLowerCase()) 
            // ||
            // option.name.toLowerCase().includes(searchInput!.toLowerCase())
        );
    }, [options, searchInput]);

    const renderOptions = (options: SelectOptionProps[]) => {
        return options?.length > 0 ? (
            options?.map((option, index) => {
                const isSelected = selected?.id === option.id

                return (
                    <button
                        type='button'
                        key={String(option.id) + String(index)}
                        className={optionClassName(option, index, selected?.id === option.id)}
                        onClick={() => {
                            handleSelect(option)
                            closeDropdown()
                        }}
                    >
                        <span
                            title={option.symbol}
                            className={`${isSelected ? 'font-black ' : 'font-semibold'
                                } block truncate text-black text-sm cursor-pointer uppercase leading-[0.8rem] font-semibold`}
                        >
                            {option.id}
                        </span>
                    </button>
                )
            })
        ) : (
            <div className='relative cursor-default select-none py-2 pl-3 pr-9'>
                <span className='font-normal block truncate text-base text-black'>No options here</span>
            </div>
        )
    }

    return (
        <div className='relative grow'>
            <button type='button' onClick={openDropdown} className={containerClassName()}>
                <span title={selected?.symbol} className={labelClassName()}>
                    {selected?.symbol || placeholder}
                </span>
                <span className='pointer-events-none ml-3 flex items-center'>
                    <FaChevronDown className='w-4 h-4 dark:text-white' />
                </span>
            </button>

            {isDropdownOpen && (
                <div
                    className={
                        'absolute z-[500] w-[120px] overflow-auto rounded-lg bg-white text-base ring-opacity-5 focus:outline-none mt-1 max-h-40 '
                    }
                    style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)' }}
                    ref={elementRef}
                >
                    {isSearchable && (
                        <input
                            type='text'
                            className='w-[120px] block text-base font-semibold border-black dark:border-white rounded-t-lg text-gray-900 dark:text-gray-200 py-1.5 px-2.5 border-2 bg-gray-200 dark:bg-gray-600 outline-none focus:outline-none'
                            onChange={(ev) => {
                                setSearchInput?.(ev.target.value)
                            }}
                            placeholder={placeholder}
                            value={searchInput}
                        />
                    )}

                    {renderOptions(filteredOptions)}
                </div>
            )}
        </div>
    )
}

export default Select