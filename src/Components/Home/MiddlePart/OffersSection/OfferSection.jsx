import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  Box,
  Container,
  Grid,
  IconButton,
  Slider,
} from "@mui/material";
import WifiTetheringErrorIcon from '@mui/icons-material/WifiTetheringError';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOffers } from "../../../../Store/Offer/Action";
import { changeTheme } from "../../../../Store/Theme/Action";
import HoverCard from "./HoverCard";
import { findUserById } from "../../../../Store/Auth/Action";
import { checkIfUserApplied} from "../../../../Store/Offer/Action";
import OfferCardModal from "./OfferCardModal";

const OfferSection = () => {
 
  const {auth,offer, theme } = useSelector((store) => store);
  
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const offersPerPage = 4;

  // New state for additional filters
  const [weightRange, setWeightRange] = useState([40, 120]);
  const [heightRange, setHeightRange] = useState([1.5, 2.2]);
  const [positionFilter, setPositionFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [appliedOffers, setAppliedOffers] = useState({});
  useEffect(() => {
    dispatch(fetchAllOffers()).then(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (offer.offers && offer.offers.length > 0) {
      // Loop over each offer
      offer.offers.forEach((offer) => {
        // Dispatch the checkIfUserApplied action
        dispatch(checkIfUserApplied(offer.id)).then((isApplied) => {
          // Store the result in appliedOffers state
          console.log("Offer ID:", offer.id, "Applied Status:", isApplied);
          setAppliedOffers((prev) => ({
            ...prev,
            [offer.id]: isApplied, // Store isApplied under offer.id
          }));
        });
      });
    }
  }, [dispatch, offer.offers]);

  useEffect(() => {
    dispatch(fetchAllOffers());
  
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchAllOffers());
  
  }, [dispatch]);

  // Updated filter function
  const filteredOffers = offer.offers.filter((offer) => {
    const searchMatch = [
      offer.location,
      offer.education,
      offer.weight,
      offer.preferredFoot,
    ].some((attr) => attr.toLowerCase().includes(searchTerm.toLowerCase()));

    const weightMatch =
      offer.weight >= weightRange[0] && offer.weight <= weightRange[1];
    const heightMatch =
      offer.height >= heightRange[0] && offer.height <= heightRange[1];
    const positionMatch =
      positionFilter === "" || offer.position === positionFilter;

    return searchMatch && weightMatch && positionMatch && heightMatch;
  });

  // Sort offers based on selected criteria
  const sortedOffers = [...filteredOffers].sort((a, b) => {
    if (sortBy === "id-asc") return a.id - b.id; // Sort by id (oldest first)
    if (sortBy === "id-desc") return b.id - a.id; // Sort by id (newest first)
    return 0;
  });

  // Paginate offers
  const indexOfLastOffer = page * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  const currentOffers = sortedOffers.slice(indexOfFirstOffer, indexOfLastOffer);
  const toggleTheme = () => {
    dispatch(changeTheme(theme.currentTheme === "dark" ? "light" : "dark"));
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  // modal 
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const handleOpenModal = (offer) => {
    setSelectedOffer(offer);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOffer(null);
  };


 
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          color="primary"
        >
          Transfer Offers
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <TextField
              label="Search players, teams, or attributes"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: <SearchIcon color="action" />,
              }}
            />
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              displayEmpty
              sx={{ width: 200 }}
            >
              <MenuItem value="">Sort by</MenuItem>
              
              
              <MenuItem value="id-asc">Oldest Offers </MenuItem>{" "}
              {/* Sort by oldest offer */}
              <MenuItem value="id-desc">Newest Offers </MenuItem>{" "}
              {/* Sort by newest offer */}
            </Select>

            <IconButton color="primary" onClick={toggleTheme}>
              <SortIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Box sx={{ width: 200 }}>
              <Typography gutterBottom>Weight Range (kg)</Typography>
              <Slider 
               size="small"
                value={weightRange}
                onChange={(e, newValue) => setWeightRange(newValue)}
                valueLabelDisplay="auto"
                min={40}
                max={120}
                sx={{
                  '& .MuiSlider-thumb': {
                    backgroundColor: 'secondary.main', // color for the slider thumb (point)
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#D6AD60', // color for the track
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor:  '#FFFFFF', // color for the rail
                  },
                }}
              />
            </Box>
            <Box sx={{ width: 200 }}>
              <Typography gutterBottom>Height Range (cm)</Typography>
              <Slider
               size="small"
                value={heightRange}
                onChange={(e, newValue) => setHeightRange(newValue)}
                valueLabelDisplay="auto"
                min={1.5}
                max={2.2}
                step={0.01}
                sx={{
                  '& .MuiSlider-thumb': {
                    backgroundColor: 'secondary.main', // color for the slider thumb (point)
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#D6AD60', // color for the track
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor:  '#FFFFFF', // color for the rail
                  },
                }}
              />
            </Box>
            <Select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              displayEmpty
              sx={{ width: 200 }}
            >
              <MenuItem value="">All Positions</MenuItem>
              <MenuItem value="Forward">Forward</MenuItem>
              <MenuItem value="Midfielder">Midfielder</MenuItem>
              <MenuItem value="Defender">Defender</MenuItem>
              <MenuItem value="Goalkeeper">Goalkeeper</MenuItem>
            </Select>
          </Box>
        </Box>

        <Grid container spacing={3} justifyContent="center" alignItems="center">
  {currentOffers && currentOffers.length > 0 ? (
    currentOffers.map((offer) => (
      <Grid item key={offer.id}>
        <HoverCard 
                  offer={offer} 
                  isApplied={appliedOffers[offer.id]}
                  onImageClick={handleOpenModal}
                />
      </Grid>
    ))
  ) : (
    <div className="w-full h-[22rem] border-3 border-[#FFD700] rounded-lg flex flex-col items-center justify-center pl-6">
  <WifiTetheringErrorIcon style={{ color: "#D6AD60", fontSize: "5rem" }} />
  <p style={{ color: "#D6AD60", marginTop: "1rem" }}>No offers found</p>
</div>

  )}
</Grid>

<Stack spacing={3} alignItems="center" sx={{ mt: 4 }}>
  <Pagination
    count={Math.ceil(sortedOffers.length / offersPerPage)}
    page={page}
    onChange={handleChangePage}
    variant="outlined"
    sx={{
      "& .MuiPaginationItem-root": {
        color: "#D6AD60",
        borderColor: "#D6AD60",
      },
      "& .MuiPaginationItem-root.Mui-selected": {
        backgroundColor: "#D6AD60",
        color: "white",
      },
    }}
  />
</Stack>
<OfferCardModal
          open={modalOpen}
          handleClose={handleCloseModal}
          offer={selectedOffer}
          isApplied={selectedOffer ? appliedOffers[selectedOffer.id] : false}
        />
      </Container>
    </Box>
  );
};

export default OfferSection;
