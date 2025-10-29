// Forbidden.jsx
import * as React from "react";
import { Box, Grid, Typography, Stack, Button, Paper } from "@mui/material";
import WifiOffRoundedIcon from "@mui/icons-material/WifiOffRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import SyncProblemIcon from '@mui/icons-material/SyncProblem';



/**
 * Props
 * - messageError?: string ("ERR_NETWORK" pour réseau)
 * - statusCode?: number (ex: 403, 404)
 * - onRetry?: () => void
 * - onGoHome?: () => void
 */
export default function Forbidden({
  messageError,
  statusCode,
  onRetry,
  onGoHome,
}) {
  const isNetwork = messageError === "ERR_NETWORK";
  const is403 = statusCode === 403;
  const is404 = statusCode === 404;

  // Texte dynamique (FR)
  const title = isNetwork
    ? "Un problème est survenu"
    : is403
    ? "Accès refusé"
    : is404
    ? "Page introuvable (404)"
    : "Accès refusé : 404";

  const subtitle = isNetwork
    ? "Merci de réessayer dans quelques instants."
    : is403
    ? "Désolé, vous n'avez pas les autorisations pour accéder à cette page."
    : is404
    ? "La page que vous cherchez n'existe pas ou a été déplacée."
    : "Désolé, vous n'avez pas accès à cette page.";

  const hint = isNetwork
    ? ""
    : "Veuillez contacter l’administrateur de votre organisation pour obtenir l’accès.";

  const Icon = isNetwork
    ? SyncProblemIcon
    : is403
    ? LockRoundedIcon
    : is404
    ? ErrorOutlineRoundedIcon
    : LockRoundedIcon;

  return (
    <Grid
      container
      minHeight="100dvh"
      alignItems="center"
      justifyContent="center"
      sx={{
        px: 2,
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0) 100%)",
      }}
    >
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Paper
          elevation={2}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              mx: "auto",
              mb: 2,
              display: "grid",
              placeItems: "center",
              borderRadius: 2,
              bgcolor: (t) =>
                t.palette.mode === "dark"
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.04)",
            }}
          >
            <Icon fontSize="large" />
          </Box>

          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            {subtitle}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {hint}
          </Typography>
        
        </Paper>

       
      </Grid>
    </Grid>
  );
}
