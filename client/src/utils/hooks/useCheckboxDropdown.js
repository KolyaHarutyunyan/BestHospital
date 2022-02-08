import { useEffect, useState } from "react";

export const useCheckboxDropdown = (optionList = []) => {
   const [dropdownIsShown, setDropdownIsShown] = useState(false);
   const [dropdownOptions, setDropdownOptions] = useState([]);

   const checkedOptions = dropdownOptions.filter((option) => option.isChecked);
   const mappedOptions = optionList.map((option) => ({ ...option, isChecked: false }));

   useEffect(() => {
      setDropdownOptions(mappedOptions);
   }, [optionList]);

   const handleSelectedOption = (selectedOption) => {
      setDropdownOptions(
         dropdownOptions.map((option) => {
            if (option.id === selectedOption.id) {
               return selectedOption;
            }
            return option;
         })
      );
   };

   const handleDropdownOpenClose = () => setDropdownIsShown((prevState) => !prevState);
   const handleDropdownClose = () => setDropdownIsShown(false);

   return {
      dropdownIsShown,
      dropdownOptions,
      checkedOptions,
      handleSelectedOption,
      handleDropdownOpenClose,
      handleDropdownClose,
   };
};
