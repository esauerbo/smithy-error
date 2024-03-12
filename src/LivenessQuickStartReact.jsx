import React from "react";
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";
import { Loader, ThemeProvider } from "@aws-amplify/ui-react";
export function LivenessQuickStartReact() {
  const [loading, setLoading] = React.useState(true);
  const [createLivenessApiData, setCreateLivenessApiData] =
    React.useState(null);

  React.useEffect(() => {
    const fetchCreateLiveness = async () => {
      /*
       * This should be replaced with a real call to your own backend API -> (THIS IS THE PART ADDED)
       */
      fetch(CREATE_ENDPOINT)
        .then((response) => response.json())
        .then((result) => {
          const mockResponse = { sessionId: result.sessionId };
          console.log(mockResponse);
          setCreateLivenessApiData(mockResponse);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(true);
          console.error("error", error);
        });
    };

    fetchCreateLiveness();
  }, []);

  const handleAnalysisComplete = async () => {
    /*
     * This should be replaced with a real call to your own backend API
     */
    const response = await fetch(
      `${RESULTS_ENDPOINT}/${createLivenessApiData.sessionId}`
    );
    const data = await response.json();

    /*
     * Note: The isLive flag is not returned from the GetFaceLivenessSession API
     * This should be returned from your backend based on the score that you
     * get in response. Based on the return value of your API you can determine what to render next.
     * Any next steps from an authorization perspective should happen in your backend and you should not rely
     * on this value for any auth related decisions.
     */
    if (data.isLive) {
      console.log("User is live");
    } else {
      console.log("User is not live");
    }
  };

  return (
    <ThemeProvider>
      {loading ? (
        <Loader />
      ) : (
        <FaceLivenessDetector
          sessionId={createLivenessApiData.sessionId}
          region="us-east-1"
          onAnalysisComplete={handleAnalysisComplete}
          onError={(error) => {
            console.error(error);
          }}
        />
      )}
    </ThemeProvider>
  );
}
