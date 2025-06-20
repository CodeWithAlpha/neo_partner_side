import { Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Table(theme: Theme) {
  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          position: "relative",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: theme.palette.action.selected,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${theme.palette.divider}`, // Adds a subtle border
          padding: theme.spacing(1.5),
        },
        head: {
          color: theme.palette.primary.main, // Ensures the header text color is consistent
          fontSize: 16,
          fontWeight: 600, // Makes headers stand out without a background
          backgroundColor: theme.palette.grey[300], // Removes the background color
        },
        stickyHeader: {
          backgroundColor: theme.palette.grey[300], // Removes the background color
          backgroundImage: "none", // Removes the gradient
        },
        paddingCheckbox: {
          paddingLeft: theme.spacing(1),
        },
      },
    },
    MuiTablePagination: {
      defaultProps: {
        backIconButtonProps: {
          size: "small",
        },
        nextIconButtonProps: {
          size: "small",
        },
        SelectProps: {
          MenuProps: {
            MenuListProps: {
              sx: {
                "& .MuiMenuItem-root": {
                  ...theme.typography.body2,
                },
              },
            },
          },
        },
      },

      styleOverrides: {
        root: {
          borderTop: `solid 1px ${theme.palette.divider}`,
        },
        toolbar: {
          height: 64,
        },
        actions: {
          marginRight: theme.spacing(1),
        },
        select: {
          "&:focus": {
            borderRadius: theme.shape.borderRadius,
          },
        },
      },
    },
  };
}
