import {FaTimesCircle} from "react-icons/fa";
import {FaFilter} from "react-icons/fa";
import {useState} from "react";
import {Box, Button, Card, Input} from "@mui/joy";
import {MultiSelectQualification} from "./MultiSelectQualification.tsx";

interface FilterProps {
    setSelectedQualifications: (selected: string[]) => void;
    setSearchedCity: (selected: string) => void;
}

export function Filter({setSelectedQualifications, setSearchedCity: setSearchedCity}: FilterProps) {
    const [showFilter, setShowFilter] = useState(false);
    const [filterSelected, setFilterSelected] = useState(false);
    const [tempCity, setTempCity] = useState<string>("");
    const [tempQualifications, setTempQualifications] = useState<string[]>([]);

    const handleClearFields = () => {
        setTempCity("")
        setSearchedCity("")
        setTempQualifications([])
        setSelectedQualifications([])
        setShowFilter(false);
        setFilterSelected(false);
    }

    return (
        <div style={{
            position: "relative",
            display: "inline-block",
            height: "36px",
        }}>
            <Button
                sx={{
                    padding: 0,
                    width: {xs: "36px", sm: "7rem"},
                    height: "100%",
                    border: "none",
                    borderRadius: "12px",
                    backgroundColor: filterSelected ? "#1976d2" : "#e3e3e3",
                    color: filterSelected ? "white" : "black",
                    "&:hover": {backgroundColor: filterSelected ? "#1976d2" : "#e3e3e3"},
                    minWidth: "unset"
                }}
                onClick={() => setShowFilter(prev => !prev)}
            >
                <FaFilter/>
                <Box component="span" sx={{display: {xs: 'none', sm: 'inline'}, ml: 1}}>
                    Filter
                </Box>
            </Button>
            {showFilter && (
                <Card sx={{
                    position: "absolute",
                    zIndex: 9999,
                    left: {xs: "auto", sm: "-6rem"},
                    right: {xs: "0", sm: "auto"},
                    mt: "0.5rem",
                    width: {xs: "calc(100vw - 2rem)", sm: "15rem"},
                    maxWidth: "15rem",
                    height: "auto",
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 5px 30px rgba(0, 0, 0, 0.2)",
                }}>
                    <Input placeholder={"Ort..."} value={tempCity} onChange={(e) => {
                        setTempCity(e.target.value)
                    }}/>
                    <MultiSelectQualification tempQualifications={tempQualifications}
                                              setTempQualifications={setTempQualifications}/>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    > <Button sx={{
                        "&:hover": {backgroundColor: "#1976d2"},
                        width: "70%",
                    }}
                              onClick={() => {
                                  setSearchedCity(tempCity.trim())
                                  setSelectedQualifications(tempQualifications)
                                  setFilterSelected(tempCity.trim() !== "" || tempQualifications.length > 0);
                                  setShowFilter(false);
                              }}>
                        Übernehmen
                    </Button>
                        <Button sx={{
                            backgroundColor: "red",
                            "&:hover": {backgroundColor: "red"}
                        }}
                                onClick={() => {
                                    handleClearFields();
                                }}>
                            <FaTimesCircle/>
                        </Button>
                    </Box>
                </Card>
            )}
        </div>
    );
}