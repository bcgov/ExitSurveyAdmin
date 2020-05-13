using System.Linq;

public static class TrimAllStringsExtension
***REMOVED***

    public static T TrimAllStrings<T>(this T input)
    ***REMOVED***
        var stringProperties = input
            .GetType()
            .GetProperties()
            .Where(p => p.PropertyType == typeof(string) && p.CanWrite);

        foreach (var stringProp in stringProperties)
        ***REMOVED***
            string currentValue = (string)stringProp.GetValue(input, null);
            if (currentValue != null)
            ***REMOVED***
                stringProp.SetValue(input, currentValue.Trim(), null);
          ***REMOVED***
      ***REMOVED***

        return input;
  ***REMOVED***
***REMOVED***