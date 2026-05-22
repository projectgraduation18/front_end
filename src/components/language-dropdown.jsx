import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

function LanguageDropdown() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button className="p-2 rounded-xl  transition text-foreground">
          <Languages size={22} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
      <DropdownMenu.Content
            sideOffset={10}
            align="end"
            avoidCollisions
            collisionPadding={10}
            forceMount
            className="
                z-[9999]
                min-w-[140px]
                rounded-2xl
                bg-white dark:bg-gray-900
                shadow-lg
                p-2
            "
            >
          {/* AR */}
          <DropdownMenu.Item
            onClick={() => changeLanguage("ar")}
            className="
              flex cursor-pointer items-center gap-3 rounded-xl p-3
              outline-none
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition
            "
          >
            <img
              src="https://flagcdn.com/w40/eg.png"
              alt="Egypt"
              className="h-4 w-6 rounded-sm object-cover"
            />

            <span>العربية</span>
          </DropdownMenu.Item>

          {/* EN */}
          <DropdownMenu.Item
            onClick={() => changeLanguage("en")}
            className="
              flex cursor-pointer items-center gap-3 rounded-xl p-3
              outline-none
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition
            "
          >
            <img
              src="https://flagcdn.com/w40/gb.png"
              alt="English"
              className="h-4 w-6 rounded-sm object-cover"
            />

            <span>English</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default LanguageDropdown;