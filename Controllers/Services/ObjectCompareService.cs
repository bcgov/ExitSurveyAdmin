using System.Runtime.CompilerServices;
using System.Linq;
using System.Reflection;
using System.Reflection.Metadata;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;



// Compare basic types. Code from https://stackoverflow.com/a/44760420.

public class PropertyVariance
***REMOVED***
    public PropertyInfo PropertyInfo ***REMOVED*** get; set; ***REMOVED***
    public object ValueA ***REMOVED*** get; set; ***REMOVED***
    public object ValueB ***REMOVED*** get; set; ***REMOVED***
***REMOVED***
public static class ObjectExtensions
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

    public static List<PropertyVariance> DetailedCompare<T>(this T val1, T val2)
    ***REMOVED***
        var propertyInfo = val1.GetType().GetProperties().Where(p => p.CanWrite);
        return propertyInfo
        .Select(f => new PropertyVariance
        ***REMOVED***
            PropertyInfo = f,
            ValueA = f.GetValue(val1),
            ValueB = f.GetValue(val2)
      ***REMOVED***)
        .Where(v =>
        ***REMOVED***
            if (v.ValueA != null)
            ***REMOVED***
                // If ValueA is not null, compare its value to ValueB. If they
                // are NOT equal, include them.
                return !v.ValueA.Equals(v.ValueB);
          ***REMOVED***
            else
            ***REMOVED***
                // ValueA is null. ValueB might not be. If it isn't, include it.
                return v.ValueB != null;
          ***REMOVED***

      ***REMOVED***)
        .ToList();
  ***REMOVED***
***REMOVED***