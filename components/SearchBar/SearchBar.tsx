import { Input } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";

type Props = {
    value: string
    placeholder?: string
    onChange: (event: any) => void
}

const SearchBar = ({ placeholder, value, onChange }: Props) => {
    return (
        <Input
            clearable
            contentLeft={
                <SearchIcon
                    fill="var(--nextui-colors-accents6)"
                    size={16}
                />
            }
            label=" "
            css={{
                w: "100%",
                "@xsMax": {
                    mw: "100%",
                },
                "& .nextui-input-content--left": {
                    h: "100%",
                    ml: "$4",
                    dflex: "center",
                },
            }}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}

export default SearchBar;