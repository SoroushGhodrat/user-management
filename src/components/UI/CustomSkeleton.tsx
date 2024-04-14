import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Skeleton from "@mui/joy/Skeleton";

const AnimationSkeleton = () => {
  return (
    <Stack spacing={2} useFlexGap>
      <Card variant="outlined" sx={{ width: 1000 }}>
        <Button>
          Read more
          <Skeleton animation="wave" />
        </Button>
        <Button>
          Read more
          <Skeleton animation="wave" />
        </Button>
        <CardContent orientation="horizontal">
          <Skeleton
            animation="wave"
            variant="circular"
            width={28}
            height={28}
          />
          <div>
            <Skeleton animation="wave" variant="text" sx={{ width: 950 }} />
          </div>
        </CardContent>
        <CardContent orientation="horizontal">
          <Skeleton
            animation="wave"
            variant="circular"
            width={28}
            height={28}
          />
          <div>
            <Skeleton animation="wave" variant="text" sx={{ width: 950 }} />
          </div>
        </CardContent>
        <CardContent orientation="horizontal">
          <Skeleton
            animation="wave"
            variant="circular"
            width={28}
            height={28}
          />
          <div>
            <Skeleton animation="wave" variant="text" sx={{ width: 950 }} />
          </div>
        </CardContent>
        <CardContent orientation="horizontal">
          <Skeleton
            animation="wave"
            variant="circular"
            width={28}
            height={28}
          />
          <div>
            <Skeleton animation="wave" variant="text" sx={{ width: 950 }} />
          </div>
        </CardContent>
        <CardContent orientation="horizontal">
          <Skeleton
            animation="wave"
            variant="circular"
            width={28}
            height={28}
          />
          <div>
            <Skeleton animation="wave" variant="text" sx={{ width: 950 }} />
          </div>
        </CardContent>
        <CardContent orientation="horizontal">
          <Skeleton
            animation="wave"
            variant="circular"
            width={28}
            height={28}
          />
          <div>
            <Skeleton animation="wave" variant="text" sx={{ width: 950 }} />
          </div>
        </CardContent>
        <CardContent orientation="horizontal">
          <Skeleton
            animation="wave"
            variant="circular"
            width={28}
            height={28}
          />
          <div>
            <Skeleton animation="wave" variant="text" sx={{ width: 950 }} />
          </div>
        </CardContent>
        <CardContent orientation="horizontal">
          <Skeleton
            animation="wave"
            variant="circular"
            width={28}
            height={28}
          />
          <div>
            <Skeleton animation="wave" variant="text" sx={{ width: 950 }} />
          </div>
        </CardContent>
        <CardContent orientation="horizontal">
          <Skeleton
            animation="wave"
            variant="circular"
            width={28}
            height={28}
          />
          <div>
            <Skeleton animation="wave" variant="text" sx={{ width: 950 }} />
          </div>
        </CardContent>
        <CardContent orientation="horizontal">
          <Skeleton
            animation="wave"
            variant="circular"
            width={28}
            height={28}
          />
          <div>
            <Skeleton animation="wave" variant="text" sx={{ width: 950 }} />
          </div>
        </CardContent>
        <CardContent orientation="horizontal">
          <Skeleton
            animation="wave"
            variant="circular"
            width={28}
            height={28}
          />
          <div>
            <Skeleton animation="wave" variant="text" sx={{ width: 950 }} />
          </div>
        </CardContent>
        <CardContent orientation="horizontal">
          <Skeleton
            animation="wave"
            variant="circular"
            width={28}
            height={28}
          />
          <div>
            <Skeleton animation="wave" variant="text" sx={{ width: 950 }} />
          </div>
        </CardContent>
        <Button>
          Read more
          <Skeleton animation="wave" />
        </Button>
      </Card>
    </Stack>
  );
};

export default AnimationSkeleton;
