export class AppSettings {
    public static SUCCESS_STATUS = "SUCCESS";
    public static ERROR_STATUS = "ERROR";
    public static NO_ENTITY_IN_DATABASE = "NO_ENTITY_IN_DATABASE";
    public static WRONG_INPUT_DATA = "WRONG_INPUT_DATA";
    public static ERROR_IN_ALGORITHM = "ERROR_IN_ALGORITHM";
    public static WRONG_CODE = "WRONG_CODE";

    // TBD: use this for sending error
    public handle = (promise) => {
        return promise
            .then((data) => ([data, undefined]))
            .catch((error) => Promise.resolve([undefined, error]));
    }
}
