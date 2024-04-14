import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Skeleton from "@mui/joy/Skeleton";

const AnimationSkeleton = () => {
  const width = 950;

  return (
    <Stack spacing={2} useFlexGap>
      <Card variant="outlined">
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
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ width: { width } }}
            />
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
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ width: { width } }}
            />
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
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ width: { width } }}
            />
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
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ width: { width } }}
            />
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
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ width: { width } }}
            />
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
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ width: { width } }}
            />
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
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ width: { width } }}
            />
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
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ width: { width } }}
            />
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
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ width: { width } }}
            />
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
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ width: { width } }}
            />
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
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ width: { width } }}
            />
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
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ width: { width } }}
            />
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
