import { Input } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";

const SearchBar = () => {
    return (
        <Input
            clearable
            contentLeft={
                <SearchIcon
                    fill="var(--nextui-colors-accents6)"
                    size={16}
                />
            }
            contentLeftStyling={false}
            css={{
                w: "100%",
                "@xsMax": {
                    mw: "300px",
                },
                "& .nextui-input-content--left": {
                    h: "100%",
                    ml: "$4",
                    dflex: "center",
                },
            }}
            placeholder="Search..."
        />
    );
}

export default SearchBar;