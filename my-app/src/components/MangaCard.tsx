import {
  Bookmark,
  BookmarkBorder,
  CheckCircle,
  MenuBook,
  Pause,
  PlayCircle,
  Schedule,
  Star,
  Visibility,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import type { DefaultMangaInfo, Manga } from "../types/MangaSearch";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Publishing":
      return <PlayCircle />;
    case "Finished":
      return <CheckCircle />;
    case "Hiatus":
      return <Pause />;
    default:
      return <PlayCircle />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "ongoing":
      return "primary";
    case "completed":
      return "success";
    case "hiatus":
      return "warning";
    default:
      return "default";
  }
};

interface MangaCardProps {
  manga: Manga;
}

const MangaCard = ({ manga }: MangaCardProps) => {
  const [bookmarked, setBookmarked] = React.useState(false);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      {/* Cover Image Area */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          sx={{
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          component="img"
          image={manga.images.jpg.image_url}
        />

        {/* Language Badge */}
        <Chip
          label={manga.type}
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "white",
            fontWeight: "bold",
          }}
        />

        {/* Status Badge */}
        <Chip
          icon={getStatusIcon(manga.status)}
          label={manga.status.charAt(0).toUpperCase() + manga.status.slice(1)}
          size="small"
          color={getStatusColor(manga.status)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        />

        {/* Chapter Badge */}
        <Chip
          label={`Ch. ${manga.chapters}`}
          size="small"
          variant="outlined"
          sx={{
            position: "absolute",
            bottom: 8,
            left: 8,
            backgroundColor: "rgba(255,255,255,0.9)",
            fontWeight: "bold",
          }}
        />

        {/* Bookmark Button */}
        <IconButton
          onClick={() => setBookmarked(!bookmarked)}
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            backgroundColor: "rgba(255,255,255,0.9)",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,1)",
            },
          }}
        >
          {bookmarked ? <Bookmark color="primary" /> : <BookmarkBorder />}
        </IconButton>
      </Box>

      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: "primary.main",
            fontWeight: 600,
            mb: 1,
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {manga.title}
        </Typography>

        {/* Author */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {manga.authors[0].name}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.4,
          }}
        >
          {manga.synopsis}
        </Typography>

        {/* Tags */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {manga.genres.map((genre: DefaultMangaInfo) => (
              <Chip
                key={genre.mal_id}
                label={genre.name}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: "0.7rem",
                  height: "24px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Stats */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Star sx={{ color: "#ffc107", fontSize: 16 }} />
            <Typography variant="body2" fontWeight="bold">
              {manga.score}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <MenuBook sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {manga.chapters} chapters
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Visibility sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {manga.members}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MangaCard;